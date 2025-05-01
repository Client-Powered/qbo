import { z } from "zod";
import { propertySchema_accountingMethod, propertySchema_dateMacro, propertySchema_sortOrder, propertySchema_startEndDate } from "./_schemas";

export const tax_summary = z.object({
  agency_id: z.string().describe("The ID of the Tax Agency for which to generate the report. Read the TaxAgency object to get all valid values for this field.")
})
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_sortOrder);

export type TaxSummaryType = z.infer<typeof tax_summary>;
