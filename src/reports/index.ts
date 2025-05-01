export { isCommasOption, CommasOptionItem } from "./utils";
export * from "./types";
export * as optsByEntity from "./opts";

import * as opts from "./opts";
import { z } from "zod";
import { QBOReportEntityType } from "../lib/types";

type Opts = typeof opts;
type OptsByReportType = {
  [K in keyof Opts]: z.infer<Opts[K]>
};

export type ReportQuery<T extends QBOReportEntityType> = OptsByReportType[T];