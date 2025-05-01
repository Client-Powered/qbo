import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_customer,
  propertySchema_department, propertySchema_account, propertySchema_accountingMethod, propertySchema_sourceAccount, propertySchema_accountType, propertySchema_summarizeColumnBy, propertySchema_vendor, propertySchema_class
} from "./_schemas";

export const generalLedger_columnTypes = [
  "account_name",
  "chk_print_state",
  "create_by",
  "create_date",
  "cust_name",
  "doc_num",
  "emp_name",
  "inv_date",
  "is_adj",
  "is_ap_paid",
  "is_ar_paid",
  "is_cleared",
  "item_name",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "name",
  "quantity",
  "rate",
  "split_acc",
  "tx_date",
  "txn_type",
  "vend_name",
  "net_amount",
  "tax_amount",
  "tax_code",
  "account_num",
  "klass_name",
  "dept_name"
] as const;

export const generalLedger = z.object({
  columns: z.enum(generalLedger_columnTypes).optional(),
  sort_by: z.enum(generalLedger_columnTypes).optional()
})
  .merge(propertySchema_customer)
  .merge(propertySchema_account)
  .merge(propertySchema_sourceAccount)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_accountType)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor)
  .merge(propertySchema_class);
