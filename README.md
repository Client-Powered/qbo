# QBO

This package, https://www.npmjs.com/package/@herobullion/qbo, is based off of https://www.npmjs.com/package/qbo by Client Powered, with some modifications to make it more useful for our purposes at Hero Bullion.

The purpose is to provide a simple interface for interacting with the Quickbooks Online API with Typescript. 

## Installation
```bash
yarn add @herobullion/qbo
```
or 

```bash
npm install @herobullion/qbo
```
----

## Usage

#### Initializing the client
```typescript
import * as qbo from '@herobullion/qbo';

const qboAPI = await qbo.client({
  access_token: "<QBO access token>", // Get this from completing OAuth2 flow with QBO
  refresh_token: "<QBO refresh token>", // Get this from completing OAuth2 flow with QBO
  client_id: "<YOUR QBO CLIENT ID>", // Get this from QBO developer portal
  client_secret: "<YOUR QBO ClIENT SECRET>", // Get this from QBO developer portal
  realm_id: "<YOUR QBO REALM ID>", // Get this from QBO developer portal
  use_sandbox: true // Do you want to use the QBO sandbox environment?
});
```

---
### list
*Return multiple records for an entity*

##### arguments:
- entity (string): the QBO entity
- opts (optional object): an options object
  - offset (optional integer): after how many entity records to start the results at
  - limit (optional integer): how many total records to return
  - fetch_all (optional boolean): if true, return all entity records
  - asc (optional, cannot be used with desc): A field on the QBO entity being queried which the results should be sorted by in the ascending order
  - desc (optional, cannot be used with asc): A field on the QBO entity being queried which the results should be sorted by in the descending order
  - where (optional array of objects)
    - field (field name string): the QBO entity's field to use in this filter
    - value (string or number): the value against which this filter is tested
    - operator (one of =, IN, <, >, <=, >=, LIKE as a string): the operator to use in the comparison

#### basic usage
```typescript
const customers = await qboAPI.list({
  entity: "customers"
});

// customers[0].PrimaryEmailAddr.Email etc. 

const accounts = await qboAPI.list({
  entity: "account"
});
```

#### advanced queries
```typescript

const customers = await qboAPI.list({
  entity: "customer",
  opts: {
    where: [{
      field: "PrimaryEmailAddr",
      operator: "=",
      value: "lg@intuit.com"
    }],
    asc: "PrimaryEmailAddr" 
  }
});

const employees = await qboAPI.list({
  entity: "employee",
  opts: {
    where: [
      {
        field: "GivenName",
        operator: "LIKE",
        value: "son"
      },
      {
        field: "FamilyName",
        operator: "=",
        value: "Smith"
      },
      {
        field: "CostRate",
        operator: ">",
        value: 2200
      }
    ]
  }
});
```
---
### report
*Query report entities from QBO*
##### arguments:
- entity (string): the QBO report entity
- opts (optional object): an options object of properties such as `date_macro: Date`
    - Please see the `src/report/* or the QBO api for the report entity like https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/transactionlist more information
```typescript
const transactions = await qboAPI.report({
  entity: "transactionList"
});
// transactions.Rows.Row[0].Rows.Row[0].ColData[0].value;
```
#### 

---

### read
*Return a single QBO entity for an ID*
#### arguments
- entity (string): the QBO entity
- entity_id (string): the ID of the specific record for this entity you want to receive

```ts
const customer_25 = await qboAPI.read({
  entity: "customer",
  entity_id: "25"
});
```

---

### upsert
*Insert or Update a QBO record*
#### arguments
- entity (string): the QBO entity
- record (object): the object properties of the record you want to update or create

```ts
// querying a customer record to update it
const customer_25 = await qboAPI.read({
  entity: "customer",
  entity_id: "25"
});

// updating the primary phone number property of the customer with id "25"
const updatedCustomer = await qboAPI.upsert({
  entity: "customer",
  record: {
    ...customer_25,
    PrimaryPhone:  {
      FreeFormNumber: "534-525-1234"
    }
  }
});
```

---

### remove
*Remove a QBO record*
#### arguments
- entity (string): the QBO entity
- record (object): the object of the record you want to delete

```ts
// querying a customer record to update it
const customer_25 = await qboAPI.read({
  entity: "customer",
  entity_id: "25"
});

// updating the primary phone number property of the customer with id "25"
const updatedCustomer = await qboAPI.remove({
  entity: "customer",
  record: {
    ...customer_25,
  }
});
```

---

### other methods and accessors
#### refreshAccessToken
*Refreshes the current access token*
```ts
await qboAPI.refreshAccessToken();
```
---
#### revokeAccess
*Revokes access for a refresh or access token*
```ts
await qboAPI.revokeAccess("REFRESH");
await qboAPI.revokeAccess("ACCESS");
```
---
#### get tokens
*Gets the current refresh and access token. This throws an error if there is no access or refresh token*
```ts
const { access_token, refresh_token } = qboAPI.tokens;
```

----

## Limitations / Current status
There is no automatic way to create typescript types for Quickbooks Online entities (as far as I can tell), and because this repository was created in the interests of [Client Powered](https://www.clientpowered.com/), this API is only strongly typed for the limited subset of entities which are relevant to it so far.

Currently supported record entities are:

- account - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account
- company_info - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/companyinfo
- customer - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer
- employee - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/employee
- item = https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/item
- vendor - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/vendor
- purchase_order - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/purchaseorder
- bill - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/bill
- inventory_adjustment - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/inventoryadjustment

Currently supported report entities are:

- account_list - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/accountlistdetail
- transactions_list - https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/transactionlist
- unknown (A fallthrough for adding basic query options like date_macro and sort_order for all other report types)

This will likely be expanded in the near future as we integrate more entity types from Quickbooks Online into Client Powered. In the meantime, please feel free to create PRs to add additional types to the `src/entity` folder as needed!



