import fs from "fs";
import { client } from "./index";

if (require.main === module) {
  require("dotenv").config({
    path: require("path").resolve(require("app-root-path").path, ".env")
  });
  const {
    refresh_token,
    access_token
  } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));
  client({
    use_sandbox: true,
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    access_token: access_token,
    refresh_token: refresh_token,
    realm_id: process.env.REALM_ID as string,
    max_timeout_in_ms: 10000,
    ____write_to_file: true
  } as any)
    .then(async client => {
      await client.refreshAccessToken();

      const transactionList = await client.report({
        entity: "transaction_list",
        opts: {
          start_date: "2016-01-01",
          end_date: new Date(),
          group_by: "Customer"
        }
      });
      console.log(transactionList);
      // const transactions = await client.report({
      //   entity: "transactionList"
      // });
      // const colId = transactions.Rows.Row[0].Rows.Row[0].ColData[0].value;
      // console.log(colId);
      // const customer2 = await client.query({
      //   entity: "customer"
      // });
      // console.log(customer2);
      const employee = await client.query({
        entity: "employee"
        // opts: {
        //   where: [{
        //     field: "PrimaryEmailAddr",
        //     operator: "=",
        //     value: "lg@intuit.com"
        //   }]
        // }
      });
      console.log(employee);

      const customer = await client.query({
        entity: "customer",
        opts: {
          where: [{
            field: "PrimaryEmailAddr",
            operator: "=",
            value: "lg@intuit.com"
          }]
        }
      });
      console.log(customer);
      const firstCustomer = customer[0];
      const readRes = await client.read({
        entity: "customer",
        entityId: firstCustomer.Id
      });
      console.log(readRes);
      const updatedCustomer = await client.upsert({
        entity: "customer",
        record: {
          ...firstCustomer,
          PrimaryPhone:  {
            FreeFormNumber: "534-525-1234"
          }
        }
      });
      console.log(updatedCustomer);
      // await client.refreshAccessToken();
      // await client.revokeAccess("REFRESH");
    })
    .catch(console.error);
}