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
  propertySchema_reportDate, propertySchema_startEndDueDate, propertySchema_term
} from "./_schemas";

export const customer_income = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_term)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_class)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor);

export type CustomerIncomeType = z.infer<typeof customer_income>;
