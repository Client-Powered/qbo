export interface VendorQboData {
  BillAddr?: {
    Id?: string,
    Line1?: string,
    Line2?: string,
    City?: string,
    Country?: string,
    CountrySubDivisionCode?: string,
    PostalCode?: string,
    Lat?: string,
    Long?: string
  },
  Balance?: number,
  AcctNum?: string,
  Vendor1099?: boolean,
  CurrencyRef?: {
    value: string,
    name: string
  },
  Id?: string,
  domain?: string,
  sparse?: boolean,
  SyncToken?: string,
  MetaData?: {
    CreateTime?: string,
    LastUpdatedTime?: string
  },
  Active?: boolean,
  GivenName?: string,
  FamilyName?: string,
  CompanyName?: string,
  DisplayName?: string,
  PrintOnCheckName?: string,

  PrimaryPhone?: {
    FreeFormNumber: string
  },
  PrimaryEmailAddr?: {
    Address: string
  },
  WebAddr?: {
    URI: string
  }
}
