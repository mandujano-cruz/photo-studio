let supersaas = require("supersaas-api-client");
let Client = supersaas.Client;

Client.configure({
  accountName: process.env.SUPERSAAS_ACCOUNT,
  api_key: process.env.SUPERSAAS_API_KEY,
  dryRun: false,
  verbose: false,
});

module.exports = Client.Instance;
