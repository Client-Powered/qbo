import { z } from "zod";
import {
  propertySchema_accountingMethod,
  propertySchema_apPaid,
  propertySchema_dateMacro, propertySchema_department, propertySchema_dueDateMacro,
  propertySchema_qzurl, propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_startEndDate, propertySchema_startEndDueDate,
  propertySchema_summarizeColumnBy, propertySchema_term, propertySchema_vendor,
  summarizeColumnByType
} from "./_schemas";

export const vendorBalanceDetail_columnTypes = [
  "create_by",
  "create_date",
  "doc_num",
  "due_date",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "term_name",
  "tx_date",
  "txn_type",
  "vend_bill_addr",
  "vend_comp_name",
  "vend_name",
  "vend_pri_cont",
  "vend_pri_email",
  "vend_pri_tel",
  "dept_name"
] as const;

export const vendorBalanceDetail = z.object({
  columns: z.enum(vendorBalanceDetail_columnTypes).optional(),
  sort_by: z.enum(vendorBalanceDetail_columnTypes).optional()
})
  .merge(propertySchema_term)
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_dueDateMacro)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_apPaid)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor);