import { z } from "zod";
import { propertySchema_accountingMethod, propertySchema_dateMacro, propertySchema_sortOrder, propertySchema_startEndDate, propertySchema_summarizeColumnBy, summarizeColumnByType } from "./_schemas";

export const trialBalance = z.object({})
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy);