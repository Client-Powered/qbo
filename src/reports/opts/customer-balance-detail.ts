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
  propertySchema_reportDate, propertySchema_startEndDueDate, propertySchema_agingMethod, propertySchema_arPaid, propertySchema_term
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

export const customer_balance_detail = z.object({
  custom1: z.string().optional().describe("Filter by the specified custom field as defined by the CustomField attribute in transaction entities where supported."),
  columns: z.enum(customerBalanceDetail_columnTypes).optional(),
  sort_by: z.enum(customerBalanceDetail_columnTypes).optional(),
  shipvia: z.string().optional().describe("Filter by the shipping method as stored in Invoice.ShipMethodRef.Name.")
})
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_customer)
  .merge(propertySchema_term)
  .merge(propertySchema_arPaid)
  .merge(propertySchema_agingMethod)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_department);

export type CustomerBalanceDetailType = z.infer<typeof customer_balance_detail>;
