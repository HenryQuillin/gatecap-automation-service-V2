const express = require("express");

const bodyParser = require("body-parser");
const { getArticles } = require("./newsLog/getArticles");
const { getInfo } = require("./getInfo/getInfo");
const { getInfoAll } = require("./getInfo/getInfoAll");
const { getArticleSummaries } = require("./newsLog/getArticleSummaries");
const { getReport } = require("./newsLog/getReport");
const { sendEmail } = require("./newsLog/sendEmail");
const { sendTelegramMessage } = require("./newsLog/sendTelegramMessage");
const { uploadToDocs } = require("./newsLog/uploadToDocs");
const { updateAirtable } = require("./newsLog/updateAirtable");
const { finalReport } = require("./newsLog/finalReport");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Updated Endpoint!");
});

app.post("/extract", (req, res) => {
  getArticles(req, res);
});

app.post("/getReport", async (req, res) => {
  const isTest = req.body.production ? false : true;
  const [summaries, formattedSummaries] =  await getArticleSummaries(req, res);
  const report = await getReport(summaries);
  const finalReport = await report + "\n \n EVENT SUMMARIES: \n" +formattedSummaries;

  const docLink = await uploadToDocs(finalReport, isTest);
  await updateAirtable(docLink, isTest)
  console.log(await sendEmail(docLink, req.body.emails, isTest));
  await sendTelegramMessage(docLink, isTest); 
  res.send(docLink);
});

app.post("/getinfo", async (req, res) => {
  console.log("Request received.");
  getInfo(req, res);
});

app.post("/getinfoall", async (req, res) => {
  console.log("Request received.");
  getInfoAll(req, res);
});

// eslint-disable-next-line no-undef
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("App listening on port " + port));
