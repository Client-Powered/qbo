import { AccountListQuery } from "./account-list";
import { TransactionListQuery } from "./transactions-list";
import { QBOReportEntityType } from "../types";
import { UnknownReportQuery } from "./unknown";

export type DateMacro =
  | "Today"
  | "Yesterday"
  | "This Week"
  | "Last Week"
  | "This Week-to-date"
  | "Last Week-to-date"
  | "Next Week"
  | "Next 4 Weeks"
  | "This Month"
  | "Last Month"
  | "This Month-to-date"
  | "Last Month-to-date"
  | "Next Month"
  | "This Fiscal Quarter"
  | "Last Fiscal Quarter"
  | "This Fiscal Quarter-to-date"
  | "Last Fiscal Quarter-to-date"
  | "Next Fiscal Quarter"
  | "This Fiscal Year"
  | "Last Fiscal Year"
  | "This Fiscal Year-to-date"
  | "Last Fiscal Year-to-date"
  | "Next Fiscal Year";

export interface IDateMacro {
  date_macro?: DateMacro
}

export interface IDueDateMacro {
  duedate_macro?: DateMacro
}

export interface IDocNum {
  docnum?: `${number}`
}

export interface IStartModdate {
  start_moddate?: Date
}

export interface IStartDate {
  start_date?: Date
}

export interface IDepartment {
  department?: string | string[]
}

export interface IStartDuedate {
  start_duedate?: Date
}

export interface IEndDuedate {
  end_duedate?: Date
}

export interface IVendor {
  vendor?: string | string[]
}

export interface IEndDate {
  end_date?: Date
}

export interface IMemo {
  memo?: string | string[]
}

export interface IModdateMacro {
  moddate_macro?: DateMacro
}

export interface IPrinted {
  printed?: "Printed" | "To_be_printed"
}

export interface ICreatedateMacro {
  createdate_macro?: DateMacro
}
export interface IQzurl {
  qzurl?: boolean
}

export interface ITerm {
  term?: string | string[]
}

export interface IEndCreatedate {
  end_createdate?: Date
}

export interface IName {
  name?: string | string[]
}

export interface ISortOrder {
  sort_order?: "ascend" | "descend"
}

export interface IStartCreatedate {
  start_createdate?: Date
}

export interface IEndModdate {
  end_moddate?: Date
}

export const commasOptionItem = [
  "department",
  "vendor",
  "term",
  "name"
] as const;

export type CommasOptionItem = (typeof commasOptionItem)[number];

export const isCommasOption = (val: any): val is CommasOptionItem =>
  typeof val === "string" && commasOptionItem.includes(val as any);


type ImplementedReportQuery = {
  account_list: AccountListQuery,
  transaction_list: TransactionListQuery,
  transaction_list_by_vendor: TransactionListQuery,
  transaction_list_by_customer: TransactionListQuery,
  transaction_list_with_splits: TransactionListQuery
};

type UnimplementedReportQuery =
  Record<Exclude<QBOReportEntityType, keyof ImplementedReportQuery>, UnknownReportQuery>;

export type ReportQuery<K extends QBOReportEntityType> =
  | (K extends keyof ImplementedReportQuery ? ImplementedReportQuery[K] : never)
  | (K extends keyof UnimplementedReportQuery ? UnimplementedReportQuery[K] : never);

