import { z } from "zod";
import {
  propertySchema_accountingMethod,
  propertySchema_class,
  propertySchema_customer,
  propertySchema_dateMacro, propertySchema_department,
  propertySchema_item,
  propertySchema_sortOrder,
  propertySchema_startEndDate,
  propertySchema_startEndDueDate, propertySchema_summarizeColumnBy
} from "./_schemas";

export const journalReport_columnTypes = [
  "acct_num_with_extn",
  "account_name",
  "credit_amt",
  "create_by",
  "create_date",
  "debt_amt",
  "doc_num",
  "due_date",
  "is_ar_paid",
  "is_ap_paid",
  "item_name",
  "journal_code_name",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "name",
  "neg_open_bal",
  "paid_date",
  "pmt_mthd",
  "quantity",
  "rate",
  "tx_date",
  "txn_num",
  "txn_type"
] as const;

export const journal_report = z.object({
  columns: z.enum(journalReport_columnTypes).optional(),
  sort_by: z.enum(journalReport_columnTypes).optional()
})
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_sortOrder);

export type JournalReportType = z.infer<typeof journal_report>;
