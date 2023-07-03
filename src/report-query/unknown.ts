import { IDateMacro, ISortOrder } from "./index";


export type UnknownReportQuery =
  & IDateMacro
  & ISortOrder
  & {
    [k: string]: unknown
  };




