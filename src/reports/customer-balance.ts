import { z } from "zod";
import {
  propertySchema_startEndDate,
  propertySchema_dateMacro,
  propertySchema_reportBasis,
  propertySchema_department,
  propertySchema_customer,
  propertySchema_vendor,
  propertySchema_class,
  propertySchema_item,
  propertySchema_sortOrder,
  propertySchema_summarizeColumnBy,
  propertySchema_accountingMethod,
  propertySchema_reportDate, propertySchema_arPaid
} from "./_schemas";


export const customerBalance = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_reportDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department)
  .merge(propertySchema_arPaid);
