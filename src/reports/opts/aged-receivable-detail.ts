import { z } from "zod";
import {
  propertySchema_agingMethod,
  propertySchema_createDateMacro,
  propertySchema_customer,
  propertySchema_dateMacro,
  propertySchema_modDateMacro, propertySchema_numPeriods, propertySchema_pastDue, propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_startEndDate, propertySchema_startEndDueDate,
  propertySchema_startEndModDate, propertySchema_term
} from "./_schemas";

export const agedReceivableDetail_columnTypes = [
  "bill_addr",
  "create_by",
  "create_date",
  "cust_bill_email",
  "cust_comp_name",
  "cust_msg",
  "cust_name",
  "deliv_addr",
  "doc_num",
  "due_date",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "past_due",
  "sale_sent_state",
  "ship_addr",
  "term_name",
  "tx_date",
  "txn_type",
  "sales_cust1",
  "sales_cust2",
  "sales_cust3",
  "dept_name"
] as const;

export const aged_receivable_detail = z.object({
  shipvia: z.string().optional().describe("Filter by the shipping method as stored in Invoice.ShipMethodRef.Name. Supported Values: Any shipping method as sent in the Invoice.ShipMethodRef.Name attribute at Invoice create- or update-time."),
  custom1: z.string().optional().describe("Filter by the specified custom field as defined by the CustomField attribute in transaction entities where supported. Supported Values: Name of custom field."),
  custom2: z.string().optional(),
  custom3: z.string().optional(),
  columns: z.enum(agedReceivableDetail_columnTypes).optional().describe("Specifies which columns to include in the report")
})
  .merge(propertySchema_customer)
  .merge(propertySchema_term)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_numPeriods)
  .merge(propertySchema_pastDue)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_startEndModDate)
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_agingMethod);

export type AgedReceivableDetailType = z.infer<typeof aged_receivable_detail>;
