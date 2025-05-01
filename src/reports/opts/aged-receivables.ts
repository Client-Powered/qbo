import { z } from "zod";
import {
  propertySchema_department,
  propertySchema_reportDate,
  propertySchema_sortOrder
} from "./_schemas";

export const aged_receivables = z.object({})
  .merge(propertySchema_department)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_reportDate);

export type AgedReceivablesType = z.infer<typeof aged_receivables>;
