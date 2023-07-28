const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const Airtable = require("airtable");
require("dotenv").config({ path: "/etc/secrets/.env" });

const base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
}).base("appKfm9gouHkcTC42");

const getTrackedCompanies = async () => {
  const view = "Track News";
  const tableName = "Company Tracking";
  const companies = [];

  await base(tableName)
    .select({ view: view })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        companies.push(record.get("Name")); // Replace 'Company Name' with the actual field name in your Airtable
      });
      fetchNextPage();
    });

  return companies;
};

module.exports = { getTrackedCompanies };
