

export const commasOptionItem = [
  "department",
  "vendor",
  "term",
  "name",
  "account",
  "source_account",
  "customer",
  "employee",
  "class",
  "item",
  "memo"
] as const;

export type CommasOptionItem = (typeof commasOptionItem)[number];

export const isCommasOption = (val: any): val is CommasOptionItem =>
  typeof val === "string" && commasOptionItem.includes(val as any);