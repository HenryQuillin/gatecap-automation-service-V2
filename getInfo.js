const Airtable = require("airtable");
const axios = require("axios");
const puppeteer = require("puppeteer-extra");
require("dotenv").config();
const { uploadFile } = require("./uploadFile");
const moment = require("moment-timezone");

// Add stealth plugin and use defaults
const pluginStealth = require("puppeteer-extra-plugin-stealth");

var base = new Airtable({
  apiKey:
    "pat6UUeva3HgsCP0B.08d49df5c164666ce8e2415f9a3e0800bb43afbf190450b4be31cd79bccd75fd",
}).base("appKfm9gouHkcTC42");

async function getInfo(req, res) {
  try {
    let record = await base("Deal Flow").find(req.body.newlyAddedRecordID);
    let recordName = record.fields["Name"];
    const permalink = await getUUID(recordName);

    const data1 = await getBasicInfo(permalink);
    let messages = [];
    let errPageContent;

    const data2 = await scrapePage(messages, permalink, errPageContent);
    const data = { ...data1, ...data2 };
    console.log(data);
    await updateAirtable(data, req.body.newlyAddedRecordID);

    res.json({ messages: messages, errPageContent: errPageContent, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}



async function scrapePage(messages, permalink, errPageContent) {
  const folderName = getDate();

  puppeteer.use(pluginStealth());
  return puppeteer
    .launch({
      headless: "new",
      // slowMo: 250,
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
      messages.push("at login");
      await page.screenshot({ path: "sc/1-at-login.png" });
      uploadFile("sc/1-at-login.png", "1-at-login.png", folderName);

      try {
        await page.waitForSelector("#mat-input-5");
        await page.waitForSelector("#mat-input-6");
        await page.type("#mat-input-5", "alfred@gate-cap.com");
        await page.type("#mat-input-6", "KVVE@9810Fm6pKs4");

        await Promise.all([
          page.waitForNavigation({ waitUntil: "load" }),
          page.click(".login"),
        ]);

        console.log("logged in");
        messages.push("logged in");
        await page.screenshot({ path: "sc/2-logged-in.png" });
        uploadFile("sc/2-logged-in.png", "2-logged-in.png", folderName);

        await page.goto(
          "https://www.crunchbase.com/discover/saved/view-for-automation/2fe3a89b-0a52-4f11-b3e7-b7ec2777f00a"
        );

        console.log("at company discover page");
        messages.push("at company discover page");
        await page.screenshot({ path: "sc/3-at-discover-page.png" });
        uploadFile(
          "sc/3-at-discover-page.png",
          "3-at-discover-page.png",
          folderName
        );

        await page.type("#mat-input-1", permalink);

        console.log("typed company name ");
        messages.push("typed company name ");
        await page.screenshot({ path: "sc/4-typed-company-name.png" });
        uploadFile(
          "sc/4-typed-company-name.png",
          "4-typed-company-name.png",
          folderName
        );

        await page.keyboard.press("Enter");

        console.log("pressed enter");
        messages.push("pressed enter");
        await page.screenshot({ path: "sc/5-pressed-enter.png" });
        uploadFile("sc/5-pressed-enter.png", "5-pressed-enter.png", folderName);

        await page.waitForTimeout(10000);

        console.log("Scraping page...");
        messages.push("Scraping page...");
        await page.screenshot({ path: "sc/6-scraping-page.png" });
        uploadFile("sc/6-scraping-page.png", "6-scraping-page.png", folderName);

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

        let contents = await page.$$eval(
          "grid-row:first-of-type > grid-cell > div > field-formatter",
          (elements) => elements.map((e) => e.innerText)
        );

        let res = {};
        for (let i = 0; i < headers.length; i++) {
          res[headers[i]] = contents[i];
        }
        return res;
      } catch (error) {
        await page.screenshot({ path: "sc/7-catch-block.png" });
        uploadFile("sc/7-catch-block.png", "7-catch-block.png", folderName);
        errPageContent = await page.content();
        console.error("ERROR CAUGHT:" + error);
      } finally {
        await page.screenshot({ path: "sc/8-finished.png" });
        uploadFile("sc/8-finished.png", "8-finished.png", folderName);
        await page.close();
      }

      return {};
    });
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
    url: `https://api.crunchbase.com/api/v4/entities/organizations/${permalink}?field_ids=facebook%2Ctwitter%2Clinkedin%2Cshort_description%2Cimage_url`,
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
    };
    return dataToReturn;
  } catch (error) {
    console.log("Failed the crunchbase.com/api/v4/entities request" + error);
  }
}

async function updateAirtable(data, recordID) {
  console.log("updateAirtable ran");
  base("Deal Flow").update(
    [
      {
        id: recordID,
        fields: data,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Updated ", record.get("Name"));
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
  getInfo: getInfo,
};
