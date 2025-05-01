import { z } from "zod";
import {
  propertySchema_account,
  propertySchema_accountingMethod, propertySchema_accountType,
  propertySchema_adjustedGainLoss,
  propertySchema_class,
  propertySchema_customer,
  propertySchema_dateMacro, propertySchema_department, propertySchema_employee,
  propertySchema_paymentMethod, propertySchema_sortOrder,
  propertySchema_startEndDate, propertySchema_vendor
} from "./_schemas";

export const profitAndLossDetails_columnTypes = [
  "create_by",
  "create_date",
  "doc_num",
  "last_mod_by",
  "last_mod_date",
  "memo",
  "name",
  "pmt_mthd",
  "split_acc",
  "tx_date",
  "txn_type",
  "tax_code",
  "klass_name",
  "dept_name"
] as const;

export const profitAndLossDetails = z.object({
  columns: z.enum(profitAndLossDetails_columnTypes).optional(),
  sort_by: z.enum(profitAndLossDetails_columnTypes).optional()
})
  .merge(propertySchema_customer)
  .merge(propertySchema_account)
  .merge(propertySchema_accountingMethod)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_dateMacro)
  .merge(propertySchema_adjustedGainLoss)
  .merge(propertySchema_class)
  .merge(propertySchema_paymentMethod)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_employee)
  .merge(propertySchema_department)
  .merge(propertySchema_vendor)
  .merge(propertySchema_accountType);

