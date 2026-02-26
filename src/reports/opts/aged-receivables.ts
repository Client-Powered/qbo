import { z } from "zod";
import {
  propertySchema_agingMethod,
  propertySchema_customer,
  propertySchema_dateMacro,
  propertySchema_department,
  propertySchema_qzurl,
  propertySchema_reportDate,
  propertySchema_sortOrder
} from "./_schemas";

export const aged_receivables = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_department)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_agingMethod)
  .merge(propertySchema_qzurl);

export type AgedReceivablesType = z.infer<typeof aged_receivables>;
