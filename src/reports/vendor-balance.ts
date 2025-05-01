import { z } from "zod";
import {
  propertySchema_accountingMethod,
  propertySchema_apPaid,
  propertySchema_dateMacro, propertySchema_department,
  propertySchema_qzurl, propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_startEndDate,
  propertySchema_summarizeColumnBy, propertySchema_vendor,
  summarizeColumnByType
} from "./_schemas";

export const vendorBalance = z.object({})
  .merge(propertySchema_qzurl)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_apPaid)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor);