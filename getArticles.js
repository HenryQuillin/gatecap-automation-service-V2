const Airtable = require("airtable");
const cheerio = require("cheerio");
const stringSimilarity = require("string-similarity");
let table = "News Log";

require("dotenv").config();

// eslint-disable-next-line no-undef
let port = process.env.PORT;
if (port == null || port == "") {
  table = "News Log - Dev";
}

const titleSimilarityThreshold = 0.8; // adjust this value to fit your needs
const contentSimilarityThreshold = 0.8; // adjust this value to fit your needs

// eslint-disable-next-line no-undef
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

const base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
}).base("appKfm9gouHkcTC42");

async function getArticles(req, res) {
  console.log("getArticles Request received for email " + req.body.alertEmailID);
  const alertEmailURL =
    "https://mail.google.com/mail/u/3/#inbox/" + req.body.alertEmailID;
  const html = req.body.html;
  const $ = cheerio.load(html);
  const alertQueryString = getAlertQueryString(req.body.subject);
  const company = getCompany(alertQueryString);


  
  let linkElements = $(
    "td:nth-child(2) > table > tbody > tr:nth-child(1) > td > a"
  );
  let titleElements = $(
    "td:nth-child(2) > table > tbody > tr:nth-child(1) > td > a"
  );
  let previewElements = $(
    "td:nth-child(2) > table > tbody > tr:nth-child(2) > td"
  );
  let sourceElements = $(
    "td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1) > a"
  );
  let dateElements = $(
    "td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(1)"
  );

  let articles = [];
    console.log("Number of incoming articles: " + linkElements.length)
  for (let i = 0; i < linkElements.length; i++) {
    let article = {
      type: "",
      title: $(titleElements[i]).text(),
      content_preview: $(previewElements[i]).text(),
      source: $(sourceElements[i]).text(),
      links: $(linkElements[i]).attr("href"),
      company: company,
      alertQueryString: alertQueryString,
      alertEmailURL: alertEmailURL,
      date: getDate($(dateElements[i]).text()),
    };

    let typeElement = $(
      titleElements[i].parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode.parentNode.parentNode.parentNode.parentNode
    )
      .prevAll("tr")
      .filter(function () {
        let type = $(this)
          .find("td > table > tbody > tr > td:nth-child(1)")
          .text()
          .trim()
          .toLowerCase();
        return (
          type === "news" ||
          type === "blogs" ||
          type === "twitter" ||
          type === "discussions"
        );
      })
      .first();

    if (typeElement.length > 0) {
      article.type = typeElement
        .find("td > table > tbody > tr > td:nth-child(1)")
        .text()
        .trim()
        .toLowerCase();
    }
    // Compare with all previous articles from the same email
    let similarArticleIndex = articles.findIndex((previousArticle) =>
      isSimilar(previousArticle, article)
    );

    if (similarArticleIndex !== -1) {
      // If similar, merge data
      mergeArticleData(articles[similarArticleIndex], article);
    } else {
      // If not similar to any previous article, add to list
      articles.push(article);
    }
  }
  console.log("Number of new articles" + articles.length);

  try {
    await updateAirtable(articles);
    res.json(articles);
  } catch (err) {
    console.error("Error in updateAirtable:", err);
    res.status(500).json({ error: 'There was an error processing your request' });
  }
}

// Adjust the function updateAirtable to include the comparison logic:
async function updateAirtable(articles) {
  console.log("Updating Airtable");
  // 1. Retrieve records from the last 14 days from your Airtable base.
  const existingRecords = await getExistingRecords();
  console.log("EXISTING RECORDS: ", existingRecords.length);

  articles.forEach((article) => {
    // 2. Compare each new article to this list of records.
    let similarRecord = findSimilarRecord(existingRecords, article);

    if (similarRecord) {
      // 3. If a match is found, update the record in Airtable.
      updateRecord(similarRecord, article);
    } else {
      // 4. If no match is found, create a new record in Airtable.
      createRecord(article);
    }
  });
}

async function getExistingRecords() {
  let existingRecords = [];
  console.log("TABLE: ", table)
  try {
    await base(table)
    .select({
      view: "Past week", // Specify the view here
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        existingRecords.push(record);
      });
      fetchNextPage();
    });
  }
  catch (err) {
    console.error("Error in getExistingRecords records:", err);
  }


  return existingRecords;
}

function isSimilar(article1, article2) {
  const titleSimilarity = stringSimilarity.compareTwoStrings(
    article1.title,
    article2.title
  );
  const contentSimilarity = stringSimilarity.compareTwoStrings(
    article1.content_preview,
    article2.content_preview
  );

  return (
    titleSimilarity > titleSimilarityThreshold ||
    contentSimilarity > contentSimilarityThreshold
  );
}
function mergeArticleData(article1, article2) {
  article1.source += ", " + article2.source;
  article1.links += ", " + article2.links;
}

function findSimilarRecord(existingRecords, newArticle) {
  let similarRecord = null;

  for (const record of existingRecords) {
    if (
      record.get("Company") === newArticle.company &&
      record.get("Type") === newArticle.type
    ) {
      const titleSimilarity = stringSimilarity.compareTwoStrings(
        record.get("Title"),
        newArticle.title
      );
      const contentSimilarity = stringSimilarity.compareTwoStrings(
        record.get("Content Preview"),
        newArticle.content_preview
      );
      // console.log('Title Similarity:', titleSimilarity);
      // console.log('Content Similarity:', contentSimilarity);
      if (
        titleSimilarity > titleSimilarityThreshold ||
        contentSimilarity > contentSimilarityThreshold
      ) {
        similarRecord = record;
        break;
      }
    }
  }
  return similarRecord;
}

function updateRecord(record, article) {
  try {
    base(table).update(
      record.getId(),
      {
        Source: record.get("Source") + ", " + article.source,
        Links: record.get("Links") + ", " + article.links,
      },
      function (err, record) {
        if (err) {
          console.error("Error updating record:", err);
          return;
        }
        console.log(
          "Updated record:",
          record.get("Title"),
          "with data:",
          article
        );
      }
    );
  } catch (err) { 
    console.error("Error in updateRecord:", err);
  }

}

// Create a new record
function createRecord(article) {
  try{
    base(table).create(
      {
        Company: article.company,
        "Alert Query String": article.alertQueryString,
        Type: article.type,
        Title: article.title,
        "Content Preview": article.content_preview,
        Source: article.source,
        Links: article.Links,
        "Alert Email URL": article.alertEmailURL,
        Date: article.date,
      },
      function (err, record) {
        if (err) {
          console.error("Error creating record:", err);
          return;
        }
        console.log("Created record:", record.getId());
      }
    );
  }
  catch (err) { 
    console.error("Error in createRecord:", err);
  }

}

function getAlertQueryString(subject) {
  // Extract the query string from the subject
  const match = subject.match(/\[Talkwalker Alerts\] Alert for (.+)/);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

function getCompany(alertQuery) {
  const portfolioCompanies = [
    "HamsaPay",
    "Prime Trust",
    "Figure",
    "Decent DAO",
    "Engiven",
    "Provenance",
    "RareMint",
    "Banq",
    "CoinRoutes",
  ];
  let companyFound = null;

  portfolioCompanies.forEach((company) => {
    if (alertQuery.toLowerCase().includes(company.toLowerCase())) {
      companyFound = company;
    }
  });

  return companyFound;
}
function getDate(dateString) {
  // Create a new Date object
  var date = new Date(dateString.split(" | ")[0]);

  // Get the year, month, and day
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // getMonth returns a 0-based index
  var day = date.getDate();

  // Get the hours and minutes
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Pad the month, day, hours and minutes with leading zeros if necessary
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;

  // Return the formatted date and time
  return year + "-" + month + "-" + day;
}



module.exports = {
  getArticles: getArticles,
};
