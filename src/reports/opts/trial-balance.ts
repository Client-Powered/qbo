import { z } from "zod";
import { propertySchema_accountingMethod, propertySchema_dateMacro, propertySchema_sortOrder, propertySchema_startEndDate, propertySchema_summarizeColumnBy, summarizeColumnByType } from "./_schemas";

export const trial_balance = z.object({})
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy);

export type TrialBalanceType = z.infer<typeof trial_balance>;