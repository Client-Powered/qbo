import { z } from "zod";
import {
  propertySchema_accountingMethod, propertySchema_class,
  propertySchema_customer,
  propertySchema_dateMacro, propertySchema_department,
  propertySchema_sortOrder,
  propertySchema_startEndDate,
  propertySchema_summarizeColumnBy,
  propertySchema_vendor,
  summarizeColumnByType
} from "./_schemas";

export const vendor_expenses = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_vendor)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_class)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_accountingMethod);

export type VendorExpensesType = z.infer<typeof vendor_expenses>;