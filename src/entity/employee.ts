/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/employee
 */
export interface EmployeeQboData {
  Id: string;
  SyncToken: string;
  PrimaryAddr?: Address;
  PrimaryEmailAddr?: Email;
  DisplayName?: string;
  Title?: string;
  BillableTime?: boolean;
  GivenName?: string;
  BirthDate?: Date;
  MiddleName?: string;
  SSN?: string;
  PrimaryPhone?: Phone;
  Active?: boolean;
  ReleasedDate?: Date;
  MetaData?: {
    CreateTime?: string;
    LastUpdatedTime?: string;
  };
  CostRate?: number;
  Mobile?: Phone;
  Gender?: string;
  HiredDate?: string;
  BillRate?: number;
  Organization?: boolean;
  Suffix?: string;
  FamilyName?: string;
  PrintOnCheckName?: string;
  EmployeeNumber?: string;
  domain?: string;
  sparse?: boolean;
  V4IDPseudonym?: string;
}
/**
 * QBO mailing address
 */
export interface Address {
  Id: string;
  PostalCode?: string;
  City?: string;
  Country?: string;
  Line5?: string;
  Line4?: string;
  Line3?: string;
  Line2?: string;
  Line1?: string;
  Lat?: string;
  Long?: string;
  CountrySubDivisionCode?: string;
}
/**
 * QBO email address
 */
export interface Email {
  Address?: string;
}
/**
 * QBO date string
 */
export interface Date {
  date?: string;
}
/**
 * QBO phone number object
 */
export interface Phone {
  FreeFormNumber?: string;
}
