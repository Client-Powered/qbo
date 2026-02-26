import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_customer,
  propertySchema_department,
  propertySchema_sortOrder,
  propertySchema_paymentMethod,
  propertySchema_dueDateMacro,
  propertySchema_arPaid,
  propertySchema_startEndModDate,
  propertySchema_sourceAccount,
  propertySchema_sourceAccountType,
  propertySchema_startEndDueDate,
  propertySchema_vendor,
  propertySchema_memo,
  propertySchema_apPaid,
  propertySchema_modDateMacro,
  propertySchema_createDateMacro,
  propertySchema_qzurl,
  propertySchema_term,
  propertySchema_startEndCreateDate,
  propertySchema_transactionType,
  propertySchema_groupBy
} from "./_schemas";

export const transactionListByCustomer_columnTypes = [
  "account_name",
  "create_by",
  "create_date",
  "cust_msg",
  "due_date",
  "doc_num",
  "inv_date",
  "is_ap_paid",
  "is_cleared",
  "is_no_post",
  "last_mod_by",
  "memo",
  "name",
  "other_account",
  "pmt_mthd",
  "printed",
  "sales_cust1",
  "sales_cust2",
  "sales_cust3",
  "term_name",
  "tracking_num",
  "tx_date",
  "txn_type",
  "last_mod_date",
  "ship_via",
  "olb_status",
  "is_ar_paid",
  "extra_doc_num",
  "cust_name",
  "dept_name",
  "is_adj" // Added 'is_adj' which was missed in the initial list but present in the previous example's final list for transactionList_columnTypes
] as const;

export const transaction_list_by_customer = z.object({
  bothamount: z.string().optional().describe("Filters report contents to include information for specified transaction amount. For example, bothamount=1233.45 limits report contents to transactions of amount 1233.45."),
  docnum: z.string().optional().describe("Filters report contents to include information for specified transaction number, as found in the docnum parameter of the transaction object."),
  columns: z.enum(transactionListByCustomer_columnTypes).optional(),
  sort_by: z.enum(transactionListByCustomer_columnTypes).optional(),
  printed: z.enum([ "Printed", "To_be_printed" ]).optional(),
  cleared: z.enum([ "Cleared", "Uncleared", "Reconciled", "Deposited" ]).optional(),
  name: z.string().optional().describe("Filters report contents based on the specified comma separated list of ids for the name list customer, vendor, or employee objects. Query the Customer, Vendor, or Employee name list resource to determine the list of objects for this reference. Specify values found in Customer.Id, Vendor.Id, and Employee.Id. For example, name=1,4,7 includes data in the report for namelist ids 1, 4, and 7. vendor and employee objects")
})
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_paymentMethod)
  .merge(propertySchema_dueDateMacro)
  .merge(propertySchema_arPaid)
  .merge(propertySchema_startEndModDate)
  .merge(propertySchema_sourceAccountType)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_department)
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_memo)
  .merge(propertySchema_apPaid)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro)
  .merge(propertySchema_customer)
  .merge(propertySchema_qzurl)
  .merge(propertySchema_term)
  .merge(propertySchema_startEndCreateDate)
  .merge(propertySchema_transactionType)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_groupBy);

export type TransactionListByCustomerType = z.infer<typeof transaction_list_by_customer>;
