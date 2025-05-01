import { z } from "zod";

export const datePropertyZod = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "end_date must be in YYYY-MM-DD format")
  .refine(
    (value: string | number | Date) => {
      // Additional validation to ensure the date is valid
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "end_date must be a valid date"
    }
  )
  .describe("The end date for the report or query in YYYY-MM-DD format");

export const transactionTypes = [
  "CreditCardCharge",
  "Check",
  "Invoice",
  "ReceivePayment",
  "JournalEntry",
  "Bill",
  "CreditCardCredit",
  "VendorCredit",
  "Credit",
  "BillPaymentCheck",
  "BillPaymentCreditCard",
  "Charge",
  "Transfer",
  "Deposit",
  "Statement",
  "BillableCharge",
  "TimeActivity",
  "CashPurchase",
  "SalesReceipt",
  "CreditMemo",
  "CreditRefund",
  "Estimate",
  "InventoryQuantityAdjustment",
  "PurchaseOrder",
  "GlobalTaxPayment",
  "GlobalTaxAdjustment",
  "Service Tax Refund",
  "Service Tax Gross Adjustment",
  "Service Tax Reversal",
  "Service Tax Defer",
  "Service Tax Partial Utilisation"
] as const;

export const propertySchema_transactionType = z.object({
  transaction_type: z.enum(transactionTypes).optional().describe("Filters report contents based transaction type.")
});

export const propertySchema_startEndModDate = z.object({
  start_moddate: datePropertyZod.optional(),
  end_moddate: datePropertyZod.optional()
}).describe("Specify an explicit account modification report date range, in the format YYYY-MM-DD. start_date must be less than end_date. Use if you want the report to cover an explicit date range; otherwise, use the moddate_macro to cover a standard report date range.");

export const propertySchema_startEndDate = z.object({
  start_date: datePropertyZod.optional(),
  end_date: datePropertyZod.optional()
}).describe("The start date and end date of the report, in the format YYYY-MM-DD. start_date must be less than end_date. Use if you want the report to cover an explicit date range; otherwise, use date_macro to cover a standard report date range.");

export const propertySchema_startEndDueDate = z.object({
  start_duedate: datePropertyZod.optional(),
  end_duedate: datePropertyZod.optional()
}).describe("The range of dates over which receivables are due, in the format YYYY-MM-DD. start_duedate must be less than end_duedate. If not specified, all data is returned.");

export const propertySchema_startEndCreateDate = z.object({
  start_createdate: datePropertyZod.optional(),
  end_createdate: datePropertyZod.optional()
}).describe("Specify an explicit account creation report date range, in the format YYYY-MM-DD. start_createdate must be less than end_createdate. Use if you want the report to cover an explicit date range; otherwise, use the createdate_macro to cover a standard report date range.");


export const propertySchema_reportDate = z.object({
  report_date: datePropertyZod.optional().describe("Start date to use for the report, in the format YYYY-MM-DD")
});

export const propertySchema_numPeriods = z.object({
  num_periods: z.number().int().optional().describe("The number of periods to be shown in the report.")
});

export const propertySchema_pastDue = z.object({
  past_due: z.number().int().optional().describe("The number of days in the aging period")
});

export const propertySchema_sortOrder = z.object({
  sort_order: z.enum([ "ascend", "descend" ]).optional().describe("The sort order for the report or query, either 'ascend' or 'descend'")
});

export const propertySchema_qzurl = z.object({
  qzurl: z.enum(["true", "false"]).optional().describe("Specifies whether Quick Zoom URL information should be generated for rows in the report. Quick Zoom URL is a hyperlink to another report containing further details about the particular column of data.")
});

export const dateMacroTypes = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Week-to-date",
  "Last Week-to-date",
  "Next Week",
  "Next 4 Weeks",
  "This Month",
  "Last Month",
  "This Month-to-date",
  "Last Month-to-date",
  "Next Month",
  "This Fiscal Quarter",
  "Last Fiscal Quarter",
  "This Fiscal Quarter-to-date",
  "Last Fiscal Quarter-to-date",
  "Next Fiscal Quarter",
  "This Fiscal Year",
  "Last Fiscal Year",
  "This Fiscal Year-to-date",
  "Last Fiscal Year-to-date",
  "Next Fiscal Year",
  "This Calendar Quarter",
  "This Calendar Quarter-to-date",
  "Last Calendar Quarter",
  "Last Calendar Quarter-to-date",
  "Next Calendar Quarter",
  "This Calendar Year",
  "This Calendar Year-to-date",
  "Last Calendar Year",
  "Last Calendar Year-to-date",
  "Next Calendar Year"
] as const;

export const modDateMacroTypes = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Week-to-date",
  "Last Week-to-date",
  "Next Week",
  "Next 4 Weeks",
  "This Month",
  "Last Month",
  "This Month-to-date",
  "Last Month-to-date",
  "Next Month",
  "This Fiscal Quarter",
  "Last Fiscal Quarter",
  "This Fiscal Quarter-to-date",
  "Last Fiscal Quarter-to-date",
  "Next Fiscal Quarter",
  "This Fiscal Year",
  "Last Fiscal Year",
  "This Fiscal Year-to-date",
  "Last Fiscal Year-to-date",
  "Next Fiscal Year"
] as const;

export const propertySchema_modDateMacro = z.object({
  moddate_macro: z.enum(modDateMacroTypes).optional().describe("Predefined report account modification date range. Use if you want the report to cover a standard report date range when accounts were modified; otherwise, use the start_moddate and end_moddate to cover an explicit report date range.")
});

export const propertySchema_createDateMacro = z.object({
  createdate_macro: z.enum(modDateMacroTypes).optional().describe("Predefined report account create date range. Use if you want the report to cover a standard create report date range; otherwise, use start_createdate and end_createdate to cover an explicit report date range.")
});

export const propertySchema_dateMacro = z.object({
  date_macro: z.enum(modDateMacroTypes).optional().describe("Predefined report date range. Use if you want the report to cover a standard report date range; otherwise, use start_date and end_date to cover an explicit report date range.")
});

export const propertySchema_dueDateMacro = z.object({
  duedate_macro: z.enum(modDateMacroTypes).optional().describe("Predefined date range of due dates for balances to include in the report; otherwise, use the start_duedate and end_duedate to cover an explicit report date range.")
});

export const propertySchema_arPaid = z.object({
  arpaid: z.enum([ "All", "Paid", "Unpaid" ]).optional().describe("Supported Values: All, Paid, Unpaid")
});

export const propertySchema_apPaid = z.object({
  appaid: z.enum([ "All", "Paid", "Unpaid" ]).optional().describe("Supported Values: All, Paid, Unpaid")
});


export const groupByTypes = [
  "Name",
  "Account",
  "Transaction Type",
  "Customer",
  "Vendor",
  "Employee",
  "Location",
  "Payment Method",
  "Day",
  "Week",
  "Month",
  "Quarter",
  "Year",
  "Fiscal Year",
  "Fiscal Quarter",
  "None"
] as const;
export const propertySchema_groupBy = z.object({
  group_by: z.enum(groupByTypes).optional().describe("The field in the transaction by which to group results.")
});


export const accountTypes = [
  "AccountsPayable",
  "AccountsReceivable",
  "Bank",
  "OtherCurrentAsset",
  "FixedAsset",
  "OtherAsset",
  "CreditCard",
  "OtherCurrentLiability",
  "LongTermLiability",
  "Equity",
  "Income",
  "CostOfGoodsSold",
  "Expense",
  "OtherIncome",
  "OtherExpense"
] as const;

export const propertySchema_accountType = z.object({
  account_type: z.enum(accountTypes).optional()
});

export const propertySchema_sourceAccountType = z.object({
  source_account_type: z.enum(accountTypes).optional()
});

export const paymentMethodTypes = [
  "Cash",
  "Check",
  "Dinners Club",
  "American Express",
  "Discover",
  "MasterCard",
  "Visa"
] as const;
export const propertySchema_paymentMethod = z.object({
  payment_method: z.enum(paymentMethodTypes).optional().describe("Filters report contents based on payment method.")
});

export const propertySchema_adjustedGainLoss = z.object({
  adjusted_gain_loss:  z.enum(["true", "false"]).optional().describe("Specifies whether to include the adjusted gain/loss in the report.")
});

export const propertySchema_reportBasis = z.object({
  report_basis: z.enum(["Accrual", "Cash"]).optional().describe("The accounting method used for the report, either 'Accrual' or 'Cash'.")
});

const accountPropertyZod = z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents to include information for specified accounts. Supported Values: One or more comma separated account IDs as returned in the attribute, Account.Id, of the Account object response code.");
export const propertySchema_account = z.object({
  account: accountPropertyZod
});

export const propertySchema_sourceAccount = z.object({
  source_account: accountPropertyZod
});

export const propertySchema_customer = z.object({
  customer: z.union([z.string(), z.array(z.string())]).optional().describe("Filter the report to show data for specific customers. Can be a single customer ID or an array of customer IDs.")
});

export const propertySchema_employee = z.object({
  employee: z.union([ z.string(), z.array(z.string()) ]).optional().describe("Filters report contents to include information for specified employees. Supported Values: One or more comma separated account IDs as returned in the attribute, Employee.Id, of the Employee entity response code.")
});

export const propertySchema_class = z.object({
  class: z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents to include information for specified classes if so configured in the company file. Supported Values: One or more comma separated class IDs as returned in the attribute, Class.Id, of the Class entity response code.")
});

export const propertySchema_item = z.object({
  item: z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents to include information for specified items. Supported Values: One or more comma separated item IDs as returned in the attribute, Item.Id,of the Item entity response code.")
});

export const propertySchema_department = z.object({
  department: z.union([z.string(), z.array(z.string())]).optional().describe("Filter the report to show data for specific departments. Can be a single department ID or an array of department IDs.")
});

export const propertySchema_memo = z.object({
  memo: z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents to include information for specified memo. Supported Values: One or more comma separated memo IDs.")
});

export const propertySchema_vendor = z.object({
  vendor: z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents to include information for specified vendors. Supported Values: One or more comma separated vendor IDs as returned in the attribute, Vendor.Id, of the Vendor object response code.")
});

export const propertySchema_term = z.object({
  term: z.union([z.string(), z.array(z.string())]).optional().describe("Filters report contents based on term or terms supplied. Supported Values: One or more comma separated term IDs as returned in the attribute, Term.Id of the Term object response code." )
});

export const summarizeColumnByType = [
  "Total",
  "Month",
  "Week",
  "Days",
  "Quarter",
  "Year",
  "Customers",
  "Vendors",
  "Classes",
  "Departments",
  "Employees",
  "ProductsAndServices"
] as const;

export const propertySchema_summarizeColumnBy = z.object({
  summarize_column_by: z.enum(summarizeColumnByType).optional().describe("The criteria by which to group the report results.")
});

export const propertySchema_accountingMethod = z.object({
  accounting_method: z.enum(["Cash", "Accrual"]).optional().describe("The accounting method used in the report.")
});

export const propertySchema_agingMethod = z.object({
  aging_method: z.enum([ "Report_Date", "Current" ]).optional().describe("The date upon which aging is determined.")
});