export interface PurchaseOrderQboData {
  Id?: string,
  SyncToken?: string,
  DocNumber?: string,
  MetaData?: {
    CreateTime?: string,
    LastUpdatedTime?: string
  },
  POEmail?: {
    Address?: string
  },
  VendorAddr?: {
    Line1?: string,
    Line2?: string,
    Line3?: string,
    PostalCode?: string,
    City?: string,
    CountrySubDivisionCode?: string,
    Country?: string
  },
  ShipAddr?: {
    Line1?: string,
    Line2?: string,
    Line3?: string,
    PostalCode?: string,
    City?: string,
    CountrySubDivisionCode?: string,
    Country?: string
  },
  domain?: string,
  sparse?: boolean,
  EmailStatus?: string,
  POStatus?: string,
  TxnDate?: string,
  CurrencyRef?: {
    value: string,
    name: string
  },
  LinkedTxn?: [
    {
      TxnId: string,
      TxnType: string
    }
  ],
  Line?: PurchaseOrderLineQboData[],
  VendorRef?: {
    value: string,
    name?: string
  },
  APAccountRef?: {
    value: string,
    name?: string
  },
  TotalAmt?: number,
  Memo?: string,
  PrivateNote?: string
}

export interface PurchaseOrderLineQboData {
  Id?: string,
  Description?: string,
  LineNum?: number,
  Amount: number,
  Received?: number,
  DetailType: "ItemBasedExpenseLineDetail" | "",

  ItemBasedExpenseLineDetail?: {
    BillableStatus?: string,
    ItemRef: {
      name?: string,
      value: string
    },
    UnitPrice: number,
    Qty: number,
    TaxCodeRef?: {
      value?: string
    }
  }
}
