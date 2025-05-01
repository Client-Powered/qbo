import { z } from "zod";
import { accountList_columnTypes } from "./account-list";
import { propertySchema_accountType, propertySchema_createDateMacro, propertySchema_modDateMacro, propertySchema_sortOrder, propertySchema_startEndDate, propertySchema_startEndModDate } from "./_schemas";

export const accountListDetail_columnTypes = [
  "account_name",
  "account_type",
  "detail_acc_type",
  "create_date",
  "create_by",
  "last_mod_date",
  "last_mod_by",
  "account_desc",
  "account_bal"
] as const;

export const account_list_detail = z.object({
  sort_by: z.enum(accountListDetail_columnTypes).optional(),
  columnTypes: z.enum(accountListDetail_columnTypes).optional(),
  account_status: z.enum([ "Deleted", "Not_Deleted" ]).optional().describe("The account status. ")
})
  .merge(propertySchema_accountType)
  .merge(propertySchema_startEndDate)
  .merge(propertySchema_startEndModDate)
  .merge(propertySchema_sortOrder)
  .merge(propertySchema_modDateMacro)
  .merge(propertySchema_createDateMacro);