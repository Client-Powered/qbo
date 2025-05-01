import { z } from "zod";
import { propertySchema_startEndDate, propertySchema_modDateMacro, propertySchema_sortOrder, propertySchema_startEndModDate, propertySchema_createDateMacro, propertySchema_accountType } from "./_schemas";

export const accountList_columnTypes = [
  "account_name",
  "account_type",
  "detail_acc_type",
  "create_date",
  "create_by",
  "detail_acc_type",
  "last_mod_date",
  "last_mod_by",
  "account_desc",
  "account_bal"
] as const;

export const account_list = z.object({
  sort_by: z.enum(accountList_columnTypes).optional(),
  columnTypes: z.enum(accountList_columnTypes).optional()
})
  .merge(propertySchema_accountType)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_startEndModDate);

export type AccountListType = z.infer<typeof account_list>;
