/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customertype
 */
export interface CustomerTypeQboData {
  Id: string;
  SyncToken: string;
  Name?: string;
  Active?: boolean;
  MetaData?: {
    CreateTime?: string;
    LastUpdatedTime?: string;
  };
  domain?: string;
  sparse?: boolean;
}
