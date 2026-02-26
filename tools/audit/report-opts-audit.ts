import * as fs from "node:fs";
import * as path from "node:path";

type MetadataPropertyMap = Record<string, unknown>;
type MetadataRoot = Record<string, MetadataPropertyMap>;

type AuditFinding = {
  reportFile: string;
  exportName: string;
  metadataKey: string;
  missingInSchema: string[];
  extraInSchema: string[];
};

type AuditInfo = {
  reportFile: string;
  message: string;
};

const repoRoot = path.resolve(__dirname, "..", "..");
const defaultMetadataPath = path.resolve(repoRoot, "tools", "metadata", "qbo-metadata.json");
const reportOptsDir = path.resolve(repoRoot, "src", "reports", "opts");

const parseArgs = (argv: string[]): { metadataPath: string } => {
  let metadataPath = process.env.QBO_METADATA_PATH || defaultMetadataPath;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--metadata") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--metadata requires a value");
      }
      metadataPath = path.resolve(process.cwd(), value);
      i += 1;
    }
  }

  return { metadataPath };
};

const kebabToSnake = (value: string): string => value.replace(/-/g, "_");
const kebabToMetadataKey = (value: string): string => `${value.replace(/-/g, "")}query`;

const metadataKeyOverrides: Record<string, string> = {};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getZodObjectShape = (schema: unknown): Record<string, unknown> | null => {
  if (!isPlainObject(schema)) {
    return null;
  }

  const maybeShape = (schema as { shape?: unknown }).shape;
  if (isPlainObject(maybeShape)) {
    return maybeShape;
  }

  const def = (schema as { _def?: unknown })._def;
  if (!isPlainObject(def)) {
    return null;
  }

  const shape = (def as { shape?: unknown }).shape;
  if (typeof shape === "function") {
    const computed = (shape as () => unknown)();
    return isPlainObject(computed) ? computed : null;
  }

  return isPlainObject(shape) ? shape : null;
};

const loadMetadata = (metadataPath: string): MetadataRoot => {
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Metadata file not found: ${metadataPath}`);
  }

  const raw = fs.readFileSync(metadataPath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (!isPlainObject(parsed)) {
    throw new Error(`Metadata root is not an object: ${metadataPath}`);
  }
  return parsed as MetadataRoot;
};

const getReportOptFiles = (): string[] => {
  return fs.readdirSync(reportOptsDir)
    .filter((file) => file.endsWith(".ts"))
    .filter((file) => file !== "_schemas.ts" && file !== "index.ts")
    .sort();
};

const loadSchemaKeys = (fileName: string): { exportName: string; schemaKeys: string[] } => {
  const absPath = path.resolve(reportOptsDir, fileName);
  // ts-node executes this script and transpiles required TS modules on the fly.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const moduleExports = require(absPath) as Record<string, unknown>;

  const exportName = kebabToSnake(path.basename(fileName, ".ts"));
  const candidate = moduleExports[exportName];
  let schema = candidate;

  if (!schema) {
    const firstObjectLike = Object.entries(moduleExports).find(([, value]) => getZodObjectShape(value) !== null);
    if (!firstObjectLike) {
      throw new Error(`No Zod object export found in ${fileName}`);
    }
    schema = firstObjectLike[1];
  }

  const shape = getZodObjectShape(schema);
  if (!shape) {
    throw new Error(`Export '${exportName}' in ${fileName} is not a Zod object schema`);
  }

  return {
    exportName,
    schemaKeys: Object.keys(shape).sort()
  };
};

const formatList = (items: string[]): string => (items.length === 0 ? "(none)" : items.join(", "));

const main = async (): Promise<void> => {
  const { metadataPath } = parseArgs(process.argv.slice(2));
  const metadata = loadMetadata(metadataPath);
  const reportFiles = getReportOptFiles();

  const infos: AuditInfo[] = [];
  const findings: AuditFinding[] = [];

  for (const fileName of reportFiles) {
    const fileStem = path.basename(fileName, ".ts");
    const metadataKey = metadataKeyOverrides[fileStem] ?? kebabToMetadataKey(fileStem);
    const metadataEntry = metadata[metadataKey];

    if (!isPlainObject(metadataEntry)) {
      infos.push({
        reportFile: fileName,
        message: `No metadata entry found for key '${metadataKey}'`
      });
      continue;
    }

    const metadataKeys = Object.keys(metadataEntry).sort();
    const { exportName, schemaKeys } = loadSchemaKeys(fileName);

    const metadataKeySet = new Set(metadataKeys);
    const schemaKeySet = new Set(schemaKeys);

    const missingInSchema = metadataKeys.filter((key) => !schemaKeySet.has(key));
    const extraInSchema = schemaKeys.filter((key) => !metadataKeySet.has(key));

    if (missingInSchema.length > 0 || extraInSchema.length > 0) {
      findings.push({
        reportFile: fileName,
        exportName,
        metadataKey,
        missingInSchema,
        extraInSchema
      });
    }
  }

  console.log(`Metadata path: ${metadataPath}`);
  console.log(`Audited report opts files: ${reportFiles.length}`);
  console.log("");

  if (infos.length > 0) {
    console.log("INFO");
    for (const info of infos) {
      console.log(`- ${info.reportFile}: ${info.message}`);
    }
    console.log("");
  }

  if (findings.length === 0) {
    console.log("PASS: No metadata/schema drift found across report option schemas.");
    return;
  }

  const errorCount = findings.filter((f) => f.missingInSchema.length > 0).length;
  const warnCount = findings.filter((f) => f.extraInSchema.length > 0).length;

  console.log("MISMATCHES");
  for (const finding of findings) {
    console.log(`- ${finding.reportFile} (export: ${finding.exportName}, metadata: ${finding.metadataKey})`);
    if (finding.missingInSchema.length > 0) {
      console.log(`  ERROR missing in schema: ${formatList(finding.missingInSchema)}`);
    }
    if (finding.extraInSchema.length > 0) {
      console.log(`  WARN extra in schema: ${formatList(finding.extraInSchema)}`);
    }
  }

  const customerIncomeFinding = findings.find((f) => f.reportFile === "customer-income.ts");
  if (customerIncomeFinding) {
    const canaryMissing = customerIncomeFinding.missingInSchema.filter((k) => k === "start_date" || k === "end_date");
    if (canaryMissing.length > 0) {
      console.log("");
      console.log(`CANARY: customer-income.ts correctly flagged missing fields: ${canaryMissing.join(", ")}`);
    }
  }

  console.log("");
  console.log(`Summary: ${findings.length} mismatched report schemas (${errorCount} with missing metadata fields, ${warnCount} with extra schema fields).`);

  if (errorCount > 0) {
    process.exitCode = 1;
  }
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`AUDIT_RUNTIME_ERROR: ${message}`);
  process.exit(2);
});
