const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const Airtable = require("airtable");
if (process.env.PORT == null || process.env.PORT == "") {
  require("dotenv").config();
} else {
  require("dotenv").config({ path: "/etc/secrets/.env" });
}

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
        // Return an object with both the company name and its record ID
        companies.push({
          name: record.get("Name"),  // Replace 'Name' with the actual field name in your Airtable
          id: record.id
        });
      });
      fetchNextPage();
    });

  return companies;
};

module.exports = { getTrackedCompanies };
