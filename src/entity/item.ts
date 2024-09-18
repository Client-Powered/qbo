export interface ItemQboData {
  Id?: string,
  SyncToken?: string,
  Name?: string,
  Description?: string,
  Active?: boolean,
  Sku?: string,
  FullyQualifiedName?: string,
  Taxable?: boolean,
  MetaData?: {
    CreateTime?: string,
    LastUpdatedTime?: string
  },
  UnitPrice?: number,
  domain?: string,
  sparse?: boolean,
  Type?: string,
  PurchaseDesc?: string,
  PurchaseCost?: number,
  QtyOnHand?: number,
  ItemCategoryType?: string,
  InvStartDate?: string,
  TrackQtyOnHand?: boolean,
  IncomeAccountRef?: {
    value: string
  },
  AssetAccountRef?: {
    value: string
  },
  ExpenseAccountRef?: {
    value: string
  }
}
