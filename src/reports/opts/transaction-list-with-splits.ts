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

export const transactionListWithSplits_columnTypes = [
  "tx_date",
  "txn_type",
  "doc_num",
  "is_no_post",
  "account_name",
  "memo",
  "amount",
  "is_adj",
  "create_by",
  "create_date",
  "last_mod_date",
  "last_mod_by",
  "cust_name",
  "vend_name",
  "rate",
  "quantity",
  "item_name",
  "emp_name",
  "pmt_mthd",
  "nat_open_bal",
  "tax_type",
  "is_billable",
  "debt_amt",
  "credit_amt",
  "is_cleared",
  "olb_status",
  "dept_name"
] as const;

export const transaction_list_with_splits = z.object({
  docnum: z.string().optional().describe("Filters report contents to include information for specified transaction number, as found in the docnum parameter of the transaction object."),
  columns: z.enum(transactionListWithSplits_columnTypes).optional(),
  sort_by: z.enum(transactionListWithSplits_columnTypes).optional(),
  name: z.string().optional().describe("Filters report contents based on the specified comma separated list of ids for the name list customer, vendor, or employee objects. Query the Customer, Vendor, or Employee name list resource to determine the list of objects for this reference. Specify values found in Customer.Id, Vendor.Id, and Employee.Id. For example, name=1,4,7 includes data in the report for namelist ids 1, 4, and 7. vendor and employee objects")
})
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_paymentMethod)
  .merge(propertySchema_sourceAccountType)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_transactionType)
  .merge(propertySchema_groupBy);

export type TransactionListWithSplitsType = z.infer<typeof transaction_list_with_splits>;

