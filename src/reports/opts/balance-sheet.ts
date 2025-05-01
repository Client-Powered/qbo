import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_customer,
  propertySchema_qzurl,
  propertySchema_item,
  propertySchema_class,
  propertySchema_sortOrder,
  propertySchema_department,
  propertySchema_vendor,
  propertySchema_summarizeColumnBy,
  propertySchema_accountingMethod, propertySchema_adjustedGainLoss
} from "./_schemas";

export const balance_sheet = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_item)
  .merge(propertySchema_class)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_reportBasis)
  .merge(propertySchema_qzurl)
  .merge(propertySchema_adjustedGainLoss);

export type BalanceSheetType = z.infer<typeof balance_sheet>;
