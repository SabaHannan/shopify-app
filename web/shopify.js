import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";

const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 9.95,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  },
};

// const billingConfig = {
//   "Standard Plan": {
//     amount: 100.00,
//     currencyCode: "USD",
//     interval: BillingInterval.Every30Days,
//     trialDays: 7,
//   },
// };

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: billingConfig, // or replace with undefined above to disable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
