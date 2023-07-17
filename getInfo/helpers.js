async function updateAirtableWithCompanyNotFoundError(base, recordID) {
  base("Company Tracking").update([
    {
      id: recordID,
      fields: {
        "Scraping Status": "Not on Crunchbase",
      },
    },
  ]);
}

async function updateAirtableWithScrapingStatus(base, recordID, status) {
  base("Company Tracking").update([
    {
      id: recordID,
      fields: {
        "Scraping Status": status,
      },
    },
  ]);
}

module.exports = {
  updateAirtableWithCompanyNotFoundError,
  updateAirtableWithScrapingStatus,
};
