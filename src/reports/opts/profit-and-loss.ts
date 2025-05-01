import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_customer,
  propertySchema_department,
  propertySchema_summarizeColumnBy,
  propertySchema_qzurl,
  propertySchema_accountingMethod,
  propertySchema_adjustedGainLoss,
  propertySchema_class,
  propertySchema_item,
  propertySchema_sortOrder,
  summarizeColumnByType, propertySchema_vendor
} from "./_schemas";


export const profit_and_loss = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_qzurl)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_adjustedGainLoss)
  .merge(propertySchema_class)
  .merge(propertySchema_item)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor);

export type ProfitAndLossType = z.infer<typeof profit_and_loss>;
