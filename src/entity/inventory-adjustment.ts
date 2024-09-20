export interface InventoryAdjustmentQboData {
  Id?: string,
  SyncToken?: string,
  MetaData?: {
    CreateTime?: string,
    LastUpdatedTime?: string
  },
  DocNumber?: string,
  domain?: string,
  sparse?: boolean,
  TxnDate?: string,
  "PrivateNote"?: string,
  "AdjustAccountRef"?: {
    "name"?: string,
    "value": string
  },
  "Line"?: InventoryAdjustmentLineQboData[]
}

export interface InventoryAdjustmentLineQboData {
  DetailType: "ItemAdjustmentLineDetail",
  "ItemAdjustmentLineDetail": {
    "QtyDiff": number,
    "ItemRef": {
      name?: string,
      "value": string
    }
  }
}