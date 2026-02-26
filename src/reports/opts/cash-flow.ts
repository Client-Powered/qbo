import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis, propertySchema_department, propertySchema_customer, propertySchema_vendor, propertySchema_class, propertySchema_item, propertySchema_sortOrder, propertySchema_summarizeColumnBy
} from "./_schemas";

export const cashFlow_columnTypes = [
  "account",
  "amount",
  "operating_activities",
  "investing_activities",
  "financing_activities",
  "net_change",
  "beginning_balance",
  "ending_balance"
] as const;

export const cash_flow = z.object({
  // No report-specific columns/sort_by in metadata for cash_flow
})
  .merge(propertySchema_department)
  .merge(propertySchema_customer)
  .merge(propertySchema_vendor)
  .merge(propertySchema_class)
  .merge(propertySchema_item)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_startEndDate);

export type CashFlowType = z.infer<typeof cash_flow>;
