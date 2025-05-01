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

export const transactionList_columnTypes = [
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
  "is_adj",
  "last_mod_date",
  "ship_via",
  "olb_status",
  "extra_doc_num",
  "is_ar_paid",
  "dept_name"
] as const;

export const transaction_list = z.object({
  bothamount: z.string().optional().describe("Filters report contents to include information for specified transaction amount. For example, bothamount=1233.45 limits report contents to transactions of amount 1233.45."),
  docnum: z.string().optional().describe("Filters report contents to include information for specified transaction number, as found in the docnum parameter of the transaction object."),
  columns: z.enum(transactionList_columnTypes).optional(),
  sort_by: z.enum(transactionList_columnTypes).optional(),
  printed: z.enum([ "Printed", "To_be_printed" ]).optional(),
  cleared: z.enum([ "Cleared", "Uncleared", "Reconciled", "Deposited" ]).optional()
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
  .merge(propertySchema_vendor)
  .merge(propertySchema_memo)
  .merge(propertySchema_apPaid)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro)
  .merge(propertySchema_customer)
  .merge(propertySchema_qzurl)
  .merge(propertySchema_term)
  .merge(propertySchema_startEndCreateDate)
  .merge(propertySchema_transactionType)
  .merge(propertySchema_groupBy);

export type TransactionListType = z.infer<typeof transaction_list>;

