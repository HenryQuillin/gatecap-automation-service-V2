require("dotenv").config();
const Airtable = require("airtable");

async function updateAirtable(content, isTest) {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.AIRTABLE_API_KEY;

  var base = new Airtable({
    apiKey: apiKey,
  }).base("appKfm9gouHkcTC42");

  const table = isTest ? "Weekly Reports - Dev" : "Weekly Reports";

  try {
    base(table).create(
      {
        Name: "Weekly Update - " + getDate(),
        "Doc Url": content,
        Group: "Portfolio",
      },
      function (err, record) {
        if (err) {
          console.error("Error creating record:", err);
          return;
        }
        console.log("Created record:", record.getId());
      }
    );
  } catch (err) {
    console.error("Error in createRecord:", err);
  }
}

function getDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = { updateAirtable };
