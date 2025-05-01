import { z } from "zod";
import { accountList_columnTypes } from "./account-list";
import {
  propertySchema_accountingMethod,
  propertySchema_accountType, propertySchema_agingMethod,
  propertySchema_createDateMacro,
  propertySchema_modDateMacro, propertySchema_numPeriods, propertySchema_pastDue, propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_startEndDate,
  propertySchema_startEndDueDate,
  propertySchema_startEndModDate,
  propertySchema_term, propertySchema_vendor
} from "./_schemas";

export const agedPayableDetail_columnTypes = [
  "create_by",
  "create_date",
  "doc_num",
  "due_date",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "past_due",
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

export const aged_payable_detail = z.object({
  sort_by: z.enum(agedPayableDetail_columnTypes).optional(),
  columnTypes: z.enum(agedPayableDetail_columnTypes).optional(),
  shipvia: z.string().optional().describe("Filter by the shipping method as stored in Invoice.ShipMethodRef.Name. Supported Values: Any shipping method as sent in the Invoice.ShipMethodRef.Name attribute at Invoice create- or update-time."),
  custom1: z.string().optional().describe("Filter by the specified custom field as defined by the CustomField attribute in transaction entities where supported. Supported Values: Name of custom field."),
  custom2: z.string().optional(),
  custom3: z.string().optional(),
  aging_period: z.number().int().optional().describe("The number of days in the aging period.")
})
  .merge(propertySchema_term)
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_numPeriods)
  .merge(propertySchema_vendor)
  .merge(propertySchema_pastDue)
  .merge(propertySchema_agingMethod);
