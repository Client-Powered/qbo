import {
  ICreatedateMacro,
  IDateMacro,
  IDepartment,
  IDocNum,
  IDueDateMacro, IEndCreatedate, IEndDate,
  IEndDuedate, IEndModdate, IMemo, IModdateMacro, IName, IPrinted, IQzurl, ISortOrder, IStartCreatedate,
  IStartDuedate,
  IStartModdate, ITerm,
  IVendor
} from "./index";


export type TransactionType =
  | "CreditCardCharge"
  | "Check"
  | "Invoice"
  | "ReceivePayment"
  | "JournalEntry"
  | "Bill"
  | "CreditCardCredit"
  | "VendorCredit"
  | "Credit"
  | "BillPaymentCheck"
  | "BillPaymentCreditCard"
  | "Charge"
  | "Transfer"
  | "Deposit"
  | "Statement"
  | "BillableCharge"
  | "TimeActivity"
  | "CashPurchase"
  | "SalesReceipt"
  | "CreditMemo"
  | "CreditRefund"
  | "Estimate"
  | "InventoryQuantityAdjustment"
  | "PurchaseOrder"
  | "GlobalTaxPayment"
  | "GlobalTaxAdjustment"
  | "Service Tax Refund"
  | "Service Tax Gross Adjustment"
  | "Service Tax Reversal"
  | "Service Tax Defer"
  | "Service Tax Partial Utilisation";


export type PaymentMethod =
  | "Cash"
  | "Check"
  | "Dinners Club"
  | "American Express"
  | "Discover"
  | "MasterCard"
  | "Visa";

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

export type Xls = "application/vnd/ms-excel";

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

export type SourceAccountType =
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


export type GroupBy =
  | "Name"
  | "Account"
  | "Transaction Type"
  | "Customer"
  | "Vendor"
  | "Employee"
  | "Location"
  | "Payment Method"
  | "Day"
  | "Week"
  | "Month"
  | "Quarter"
  | "Year"
  | "None";

export type TransactionsListColumns =
  | "account_name"
  | "create_by"
  | "create_date"
  | "cust_msg"
  | "due_date"
  | "doc_num"
  | "inv_date"
  | "is_ap_paid"
  | "is_cleared"
  | "is_no_post"
  | "last_mod_by"
  | "memo"
  | "name"
  | "other_account"
  | "pmt_mthd"
  | "printed"
  | "sales_cust1"
  | "sales_cust2"
  | "sales_cust3"
  | "tracking_num"
  | "tx_date"
  | "txn_type"
  | "term_name";

export type Cleared =
  | "Cleared"
  | "Uncleared"
  | "Reconciled"
  | "Deposited";


export interface ITransactionType {
  transaction_type?: TransactionType
}

export interface IPaymentMethod {
  payment_method?: PaymentMethod
}

export interface ISourceAccountType {
  source_account_type?: SourceAccountType
}

export interface IGroupBy {
  group_by?: GroupBy
}

export interface IColumns {
  columns?: TransactionsListColumns,
  sort_by?: TransactionsListColumns
}


export interface ICleared {
  cleared?: Cleared
}


export type TransactionListQuery =
  & IDateMacro
  & IPaymentMethod
  & IDueDateMacro
  & ITransactionType
  & IDocNum
  & IStartModdate
  & ISourceAccountType
  & IGroupBy
  & IDepartment
  & IStartDuedate
  & IEndDuedate
  & IVendor
  & IEndDate
  & IMemo
  & IModdateMacro
  & IPrinted
  & ICreatedateMacro
  & ICleared
  & IQzurl
  & ITerm
  & IEndCreatedate
  & IName
  & IColumns
  & ISortOrder
  & IStartCreatedate
  & IEndModdate;