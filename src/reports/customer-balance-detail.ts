import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_department,
  propertySchema_customer,
  propertySchema_vendor,
  propertySchema_class,
  propertySchema_item,
  propertySchema_sortOrder,
  propertySchema_summarizeColumnBy,
  propertySchema_accountingMethod,
  propertySchema_reportDate, propertySchema_startEndDueDate
} from "./_schemas";

export const customerBalanceDetail_columnTypes = [
  "bill_addr",
  "create_by",
  "create_date",
  "cust_bill_email",
  "cust_comp_name",
  "cust_msg",
  "cust_phone_other",
  "cust_tel",
  "cust_name",
  "deliv_addr",
  "doc_num",
  "due_date",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "sale_sent_state",
  "ship_addr",
  "ship_date",
  "ship_via",
  "term_name",
  "tracking_num",
  "tx_date",
  "txn_type",
  "sales_cust1",
  "sales_cust2",
  "sales_cust3",
  "dept_name"
] as const;

export const customerBalanceDetail = z.object({
  custom1: z.string().optional().describe("Filter by the specified custom field as defined by the CustomField attribute in transaction entities where supported."),
  columns: z.enum(customerBalanceDetail_columnTypes).optional()
})
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_customer)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department);
