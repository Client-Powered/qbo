import { CompanyInfoQboData } from "../entity/company-info";
import { CustomerQboData } from "../entity/customer";
import { CustomerTypeQboData } from "../entity/customer-type";
import { EmployeeQboData } from "../entity/employee";
import { NameReportTableTransactionsListColumnQboData } from "../entity/report";
import { AccountQboData } from "../entity/account";

export interface Tokens {
  access_token: string,
  refresh_token: string
}

export type QueryOperatorType =
  | "="
  | "IN"
  | "<"
  | ">"
  | "<="
  | ">="
  | "LIKE";

type Capitalize<S extends string> = S extends `${infer T}${infer U}` ? `${Uppercase<T>}${U}` : never;

export type SnakeToCamelCase_<Key extends string> =
Key extends `${infer FirstPart}_${infer FirstLetter}${infer LastPart}`
  ? `${Lowercase<FirstPart>}${Uppercase<FirstLetter>}${SnakeToCamelCase_<LastPart>}`
  : Lowercase<Key>;

export type SnakeToCamelCase<Key extends string> = Capitalize<SnakeToCamelCase_<Key>>;

export interface RefreshTokenResponse {
  x_refresh_token_expires_in: number,
  refresh_token:              string,
  access_token:               string,
  token_type:                 string,
  expires_in:                 number,
  intuitTid:                  string | null
}

const _qboEntities = [
  "account",
  "attachable",
  "bill",
  "bill_payment",
  "budget",
  "class",
  "company_info",
  "company_currency",
  "credit_memo",
  "customer",
  "customer_type",
  "department",
  "deposit",
  "employee",
  "estimate",
  "invoice",
  "item",
  "journal_code",
  "journal_entry",
  "payment",
  "payment_method",
  "preferences",
  "purchase",
  "purchase_order",
  "refund_receipt",
  "sales_receipt",
  "tax_agency",
  "tax_code",
  "tax_rate",
  "term",
  "time_activity",
  "transfer",
  "vendor",
  "vendor_credit",
  "exchange_rate"
] as const;

export type QBOQueryableEntityType = (typeof _qboEntities)[number];
export const qboQueryableEntities: QBOQueryableEntityType[] = _qboEntities as any;

export type QboQueryableEntityToType = {
  account: AccountQboData,
  companyInfo: CompanyInfoQboData,
  customer: CustomerQboData,
  customerType: CustomerTypeQboData,
  employee: EmployeeQboData
};

/** Gets the entity object type from the entity name  */
export type GetQBOQueryableEntityType<T extends QBOQueryableEntityType> =
  T extends keyof QboQueryableEntityToType ? QboQueryableEntityToType[T] : {
    Id: string,
    SyncToken: string,
    [k: string]: unknown
  };

export type GetQBOQueryablePropsForEntityType<
  T extends QBOQueryableEntityType,
  K extends keyof GetQBOQueryableEntityType<T>
> =
  Exclude<GetQBOQueryableEntityType<T>[K], undefined> extends { Id: any } ? never : T;

const _reportEntityNames = [
  "account_list",
  "aged_payable_detail",
  "aged_payables",
  "aged_receivable_detail",
  "aged_receivables",
  "balance_sheet",
  "cash_flow",
  "class_sales",
  "customer_balance",
  "customer_balance_detail",
  "customer_income",
  "customer_sales",
  "department_sales",
  "general_ledger",
  "inventory_valuation_summary",
  "item_sales",
  "journal_report",
  "profit_and_loss",
  "profit_and_loss_detail",
  "tax_summary",
  "transaction_list",
  "transaction_list_by_customer",
  "transaction_list_by_vendor",
  "transaction_list_with_splits",
  "trial_balance",
  "trial_balance_fr",
  "vendor_balance",
  "vendor_balance_detail",
  "vendor_expenses"
] as const;


export type QBOReportEntityType = (typeof _reportEntityNames)[number];

export const qboReportEntities: QBOReportEntityType[] = _reportEntityNames as any;

/** Gets the report object type from the entity name  */
export type GetEntitySpecificReport<T extends QBOReportEntityType> = Omit<NameReportTableTransactionsListColumnQboData, "Header"> & {
  Header: Omit<NameReportTableTransactionsListColumnQboData["Header"], "ReportName"> & {
    ReportName: SnakeToCamelCase<T>
  },
  intuitTid: string | null
};









