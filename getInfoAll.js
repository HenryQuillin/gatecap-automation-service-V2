const Airtable = require("airtable");
const axios = require("axios");
const puppeteer = require("puppeteer-extra");
require("dotenv").config();
const { uploadFile } = require("./uploadFile");
const moment = require("moment-timezone");

// Add stealth plugin and use defaults
const pluginStealth = require("puppeteer-extra-plugin-stealth");


// eslint-disable-next-line no-undef
const apiKey = process.env.AIRTABLE_API_KEY;






const Queue = require('better-queue');


// ...

// queue.js


const getInfoQueue = new Queue(getInfo, {
  concurrent: 1, // process tasks one at a time
  maxRetries: 1, // attempt each task twice before giving up
});






async function getInfoWrapper(req, res) {
  // Add a job to the queue
  getInfoQueue.push(req.body);

  res.status(200).send("Request received. Attempting to scrape data");
  console.log("Request received. Attempting to scrape data for", "...");
}

getInfoQueue.on('task_finish', function (taskId, result, stats){
  console.log(`Task ${taskId} finished: ${result}`);
  console.log(`Task ${taskId} stats:`, stats);
})

getInfoQueue.on('task_failed', function (taskId, err, stats){
  console.log(`Task ${taskId} failed with error ${err}`);
  console.log(`Task ${taskId} stats:`, stats);
})

var base = new Airtable({
  apiKey:
  apiKey,
}).base("appKfm9gouHkcTC42");

// eslint-disable-next-line no-undef
let path = process.env.PORT == null || process.env.PORT == "" ? "sc/" : "/sc/";

async function getInfo(body, cb) {
  try {

    let retries = 2;
    while (retries > 0) {
      try {
        console.log("Attempt #", (retries+1) - retries);
        await loginToCrunchbase();
        break;
      } catch (error) {
        console.error("Error logging in:", error);
        retries--;
      }
    }
    if (retries === 0) {
      console.error("Max retries reached. Unable to scrape data.");
    }

    cb(null, "done");
  } catch (error) {
    console.error("An error occurred:", error);
    cb(error);
  }
}

async function loginToCrunchbase() {
  const folderName = getDate();

  const records = await base("Company Tracking").select({
    view: "Get Info Batch Queue",
  }).all();



  puppeteer.use(pluginStealth());
  return puppeteer
    .launch({
      headless: "new",
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--proxy-server=us-pr.oxylabs.io:10000",
      ],
    })
    .then(async (browser) => {
      const username = "gatecap";
      const pass = "posHQ112015-";
      const page = await browser.newPage();

      await page.authenticate({
        username: username,
        password: pass,
      });

      await page.setViewport({ width: 1920, height: 1080 });

      await page.goto("https://www.crunchbase.com/login", {
        waitUntil: "load",
      });

      console.log("at login");

      try {
        await page.waitForSelector("#mat-input-5", { timeout: 10000 });
        await page.waitForSelector("#mat-input-6");
        await page.type("#mat-input-5", "alfred@gate-cap.com");
        await page.type("#mat-input-6", "KVVE@9810Fm6pKs4");

        await Promise.all([
          page.waitForNavigation({ waitUntil: "load" }),
          page.click(".login"),
        ]);

        console.log("logged in");

        await page.goto(
          "https://www.crunchbase.com/discover/saved/view-for-automation/2fe3a89b-0a52-4f11-b3e7-b7ec2777f00a"
        );

        console.log("at company discover page");

        return await scrapeCompanies(page, records);


 
      } catch (error) {
        await page.screenshot({ path: path + "7-catch-block.png" });
        uploadFile(path + "7-catch-block.png", "7-catch-block.png", folderName);
        console.log("PAGE H1:");
        console.log(await page.evaluate(() => document.title));
        console.error("ERROR CAUGHT:" + error);
        throw error;
      } finally {
        await page.close();
      }
    });
}


async function scrapeCompanies(page, records) {
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const recordName = record.fields["Name"];

    const permalink = await getUUID(recordName);

    const basicInfo = await getBasicInfo(permalink);
    console.log("Scraping for ", recordName);
    
    try {
  
  
      await page.type("#mat-input-1", recordName);
  
      console.log("typed company name for ", recordName);
  
  
      await page.keyboard.press("Enter");
  
      console.log("pressed enter for ", recordName);
  
      await page.waitForSelector("mat-progress-bar", { hidden: true });
  
      console.log("Collecting info for", recordName,"...");
  
  
      let headers = await page.$$eval(
        "grid-column-header > .header-contents > div",
        (elements) => {
          let validElements = elements
            .filter((e) => e.innerText)
            .map((e) => e.innerText);
  
          if (validElements[validElements.length - 1] === "ADD COLUMN") {
            validElements.pop();
          }
  
          return validElements;
        }
      );
  
  
      let rowNumber = await getRowNumber(page, recordName);
  
      console.log("Row Number: ", rowNumber); 
       
  
      let contents = await page.$$eval(
        `grid-row:nth-of-type(${rowNumber}) > grid-cell > div > field-formatter`,
        (elements) => elements.map((e) => e.innerText)
      );
  
  
      let scrapedInfo = {};
      for (let i = 0; i < headers.length; i++) {
        scrapedInfo[headers[i]] = contents[i];
      }
      if (
        compareName(scrapedInfo["Organization Name"], recordName) == false)  {
        console.error(
          `Wrong company scraped: Scraped ${scrapedInfo["Organization Name"]} but expected ${recordName}`
        );
        throw new Error(
          `Wrong company scraped: Scraped ${scrapedInfo["Organization Name"]} but expected ${recordName}`
        );
      }
      const res = { ...basicInfo, ...scrapedInfo };

      await updateAirtable(res, record.id);
      await page.click('div.filter.filter-activated.ng-star-inserted > advanced-filter > filter-multi-text > chips-container > chip > div > button > span.mat-mdc-focus-indicator');

    } catch (error) {
      console.error(`Error scraping ${recordName}:`, error);
      continue;
    }
  }
}


async function getUUID(name) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.crunchbase.com/api/v4/autocompletes?query=${encodeURIComponent(
      name
    )}&collection_ids=organizations&limit=1`,
    headers: {
      "X-cb-user-key": "9011e1fdbe5146865162bb45b036aa92",
    },
  };

  try {
    let response = await axios.request(config);
    return response.data.entities[0].identifier.permalink;
  } catch (error) {
    console.error(error);
  }
}
async function getBasicInfo(permalink) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.crunchbase.com/api/v4/entities/organizations/${permalink}?field_ids=facebook%2Cwebsite_url%2Ctwitter%2Clinkedin%2Cshort_description%2Cimage_url`,
    headers: {
      "X-cb-user-key": "9011e1fdbe5146865162bb45b036aa92",
      Cookie: "cid=CiheL2R/ki9+eQAaGtHbAg==",
    },
  };
  try {
    const response = await axios.request(config);
    const data = response.data;
    let websiteUrl = data.properties.website_url || "—";
    let imageUrl = data.properties.image_url || "";
    let linkedin =
      (data.properties.linkedin && data.properties.linkedin.value) || "—";
    let facebook =
      (data.properties.facebook && data.properties.facebook.value) || "—";
    let twitter =
      (data.properties.twitter && data.properties.twitter.value) || "—";
    let description = data.properties.short_description || "—";
    let dataToReturn = {
      "Website URL": websiteUrl,
      "Logo URL": imageUrl,
      Linkedin: linkedin,
      Facebook: facebook,
      Twitter: twitter,
      Description: description,
      Logo: [
        {
          url: imageUrl,
          filename: "Logo",
        },
      ],
      "Diligence Status": "Pending",
      "Scraping Status": "Basic Info Only",
    };
    return dataToReturn;
  } catch (error) {
    console.log("Failed the crunchbase.com/api/v4/entities request" + error);
  }
}

function compareName(s1, s2) {
  if (
   s1
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, "") !==
    s2
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, "")
  ) { return false; } else {
    return true;
  }
}


async function getRowNumber(page, companyName) {
  for (let i = 1; i <= 10; i++) {
    const selector = `grid-row:nth-of-type(${i}) > grid-cell > div > field-formatter:nth-of-type(1)`;
    const element = await page.$(selector);
    if (element) {
      const innerText = await page.evaluate((el) => el.innerText, element);
      if (compareName(innerText, companyName)) {
        return i; // Match found
      }
    }
  }
  return false; // No match found within the range
}


async function updateAirtable(data, recordID) {
  base("Company Tracking").update(
    [
      {
        id: recordID,
        fields: { ...data, "Scraping Status": "Success" },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Updated", record.get("Organization Name"));
      });
    }
  );
}

function getDate() {
  const date = moment().tz("America/Chicago");
  let month = "" + (date.month() + 1); // Months are zero-indexed in moment.js
  let day = "" + date.date();
  let hour = "" + date.hours();
  let minute = "" + date.minutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;

  return `${month}-${day}-${hour}-${minute}`;
}

module.exports = {
  getInfoAll: getInfoWrapper,
};
