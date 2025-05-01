import { z } from "zod";
import {
  propertySchema_dateMacro,
  propertySchema_summarizeColumnBy,
  propertySchema_qzurl, propertySchema_item, propertySchema_reportDate, propertySchema_sortOrder
} from "./_schemas";


export const inventoryValuationSummary = z.object({})
  .merge(propertySchema_qzurl)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_item)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy);
