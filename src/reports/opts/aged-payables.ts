import { z } from "zod";
import {
  propertySchema_agingMethod,
  propertySchema_customer,
  propertySchema_dateMacro, propertySchema_department,
  propertySchema_qzurl, propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_vendor
} from "./_schemas";

export const aged_payables = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_agingMethod)
  .merge(propertySchema_qzurl);

export type AgedPayablesType = z.infer<typeof aged_payables>;
