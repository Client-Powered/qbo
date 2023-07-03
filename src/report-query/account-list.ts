import { ICreatedateMacro, IEndDate, IEndModdate, IModdateMacro, ISortOrder, IStartDate, IStartModdate } from "./index";

export type AllBalanceSheetAccounts =
  | "Bank"
  | "AccountsReceivable"
  | "OtherCurrentAsset"
  | "FixedAsset"
  | "OtherAsset"
  | "AccountsPayable"
  | "CreditCard"
  | "OtherCurrentLiability"
  | "LongTermLiability"
  | "Equity";

export type AllAssetAccounts =
  | "Bank"
  | "AccountsReceivable"
  | "OtherCurrentAsset"
  | "FixedAsset"
  | "OtherAsset";

export type AllCurrentAssetAccounts =
  | "Bank"
  | "AccountsReceivable"
  | "OtherCurrentAsset";

export type AllBankAccounts = "Bank";

export type AllAccountsReceivableAccounts = "AccountsReceivable";

export type AllOtherCurrentAssetsAccounts = "OtherCurrentAsset";

export type AllFixedAssetsAccounts = "FixedAsset";

export type AllOtherAssetsAccounts = "OtherAsset";

export type AllLiabilityAccounts =
  | "AccountsPayable"
  | "CreditCard"
  | "OtherCurrentLiability"
  | "LongTermLiability";

export type AllCurrentLiabilityAccounts =
  | "AccountsPayable"
  | "CreditCard"
  | "OtherCurrentLiability";

export type AllAccountsPayableAccounts = "AccountsPayable";

export type AllCreditCardAccounts = "CreditCard";

export type AllOtherCurrentLiabilitiesAccounts = "OtherCurrentLiability";

export type AllLongTermLiabilitiesAccounts = "LongTermLiability";

export type Xls = "application/vnd.ms-excel";

export type AllEquityAccounts = "Equity";

export type AllIncomeExpenseAccounts =
  | "Income"
  | "CostOfGoodsSold"
  | "Expense"
  | "OtherIncome"
  | "OtherExpense";

export type AllIncomeAccounts = "Income";

export type AllCostOfGoodsSoldAccounts = "CostOfGoodsSold";

export type AllExpensesAccounts = "Expense";

export type AllOtherIncomeAccounts = "OtherIncome";

export type AccountType =
  | AllBalanceSheetAccounts
  | AllAssetAccounts
  | AllCurrentAssetAccounts
  | AllBankAccounts
  | AllAccountsReceivableAccounts
  | AllOtherCurrentAssetsAccounts
  | AllFixedAssetsAccounts
  | AllOtherAssetsAccounts
  | AllLiabilityAccounts
  | AllCurrentLiabilityAccounts
  | AllAccountsPayableAccounts
  | AllCreditCardAccounts
  | AllOtherCurrentLiabilitiesAccounts
  | AllLongTermLiabilitiesAccounts
  | Xls
  | AllEquityAccounts
  | AllIncomeExpenseAccounts
  | AllIncomeAccounts
  | AllCostOfGoodsSoldAccounts
  | AllExpensesAccounts
  | AllOtherIncomeAccounts;

export type AccountListColumns =
  | "account_name"
  | "account_type"
  | "detail_acc_type"
  | "create_date"
  | "create_by"
  | "last_mod_date"
  | "last_mod_by"
  | "account_desc"
  | "account_bal";

export interface IAccountType {
  account_type?: AccountType
}

export interface IColumns {
  columns?: AccountListColumns,
  sort_by?: AccountListColumns
}

export interface IAccountStatus {
  account_status?: "Deleted" | "Not_Deleted"
}

export type AccountListQuery =
  & IAccountType
  & IEndDate
  & IStartModdate
  & IColumns
  & ISortOrder
  & IModdateMacro
  & IEndModdate
  & IAccountStatus
  & ICreatedateMacro
  & IStartDate;

