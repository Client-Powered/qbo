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
  propertySchema_reportDate, propertySchema_startEndDueDate, propertySchema_term, propertySchema_qzurl
} from "./_schemas";

export const department_sales = z.object({})
  .merge(propertySchema_customer)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_class)
  .merge(propertySchema_item)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_summarizeColumnBy)
  .merge(propertySchema_department);

export type DepartmentSalesType = z.infer<typeof department_sales>;
