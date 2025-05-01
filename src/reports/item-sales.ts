import { z } from "zod";
import {
  propertySchema_dateMacro,
  propertySchema_summarizeColumnBy,
  propertySchema_qzurl,
  propertySchema_item,
  propertySchema_reportDate,
  propertySchema_sortOrder,
  propertySchema_customer,
  propertySchema_startEndDueDate,
  propertySchema_accountingMethod,
  propertySchema_startEndDate,
  propertySchema_class,
  propertySchema_department
} from "./_schemas";


export const itemSales = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_startEndDueDate)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_class)
  .merge(propertySchema_item)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department);
