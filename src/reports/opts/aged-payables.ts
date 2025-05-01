import { z } from "zod";
import {
  propertySchema_agingMethod,
  propertySchema_createDateMacro,
  propertySchema_customer,
  propertySchema_dateMacro, propertySchema_department,
  propertySchema_modDateMacro, propertySchema_qzurl,
  propertySchema_sortOrder,
  propertySchema_startEndDate,
  propertySchema_startEndModDate, propertySchema_vendor
} from "./_schemas";

export const aged_payables = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_startEndModDate)
  .merge(propertySchema_agingMethod)
  .merge(propertySchema_qzurl);

export type AgedPayablesType = z.infer<typeof aged_payables>;
