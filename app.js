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

// const finalReport = `
//   Dear Frank and Alfred,

// I hope this email finds you well. I wanted to provide you with a summary of the key events surrounding our portfolio company, Prime Trust, for the past week. It has been a challenging period for the company, with significant developments in its financial situation and regulatory challenges.

// Prime Trust, a major cryptocurrency custodian, has been placed into receivership by a Nevada court. The court decision comes in response to allegations of misusing customer funds and being insolvent. In light of these allegations, the former CEO of the Bank of Nevada has been appointed as the receiver to oversee the company's affairs.

// This decision follows a petition filed by the state's financial regulator, which identified issues within Prime Trust's financial infrastructure for fintech and digital asset innovators. The company has faced allegations of fraudulent activity and insolvency, which have had severe implications for its operations.

// The problems at Prime Trust reportedly began in late 2021 and resulted in a significant shortfall of customer funds. As a consequence, the company has struggled to honor customer withdrawals. Furthermore, the financial regulator issued a cease and desist order against Prime Trust, exacerbating the challenges faced by the company.

// In addition to its own difficulties, Prime Trust's situation has shed light on the regulatory uncertainties in the cryptocurrency market. Nasdaq, for example, has decided to abandon its plans to launch a crypto custody service, indicating the concerns surrounding the sector.

// The impact of Prime Trust's troubles extends beyond the company itself. The TrueUSD stablecoin, whose issuer is Prime Trust, has experienced disruptions as deposit and withdrawal services were temporarily halted. Other major players in the cryptocurrency industry, such as BitGo and FTX, have also encountered financial challenges and faced regulatory scrutiny.

// In summary, Prime Trust's receivership, financial problems, and regulatory challenges have had significant consequences not only for the company but also for other industry players. It is essential for us to closely monitor these developments to assess any potential impacts on our investment.

// Best regards,

// ChatGPT
 
//  EVENT SUMMARIES: 
// Prime Trust:
// Summary of Key Events for Prime Trust:

// - Prime Trust, a major cryptocurrency custodian, has been placed into receivership by a Nevada court following allegations of misusing customer funds and being insolvent. The former CEO of the Bank of Nevada has been appointed as the receiver.
// - The Nevada Eighth Judicial District Court has ordered Prime Trust LLC into receivership, with the Bank of Nevada named as the receiver. This decision was made in response to a petition filed by the state's financial regulator.
// - Prime Trust's financial infrastructure for fintech and digital asset innovators has faced significant issues, including allegations of fraudulent activity and insolvency. The company has also been ordered into temporary receivership pending a hearing in August.
// - The custodian's problems reportedly started in late 2021, leading to a significant shortfall of customer funds and a cease and desist order from the financial regulator.
// - As a result of Prime Trust's financial condition, the company has faced challenges in honoring customer withdrawals.
// - The decision by Nasdaq to abandon its plans to launch a crypto custody service has highlighted the regulatory uncertainties in the cryptocurrency market.
// - The TrueUSD stablecoin faced disruptions as its issuer, Prime Trust, halted deposits and withdrawals temporarily.
// - Other major players in the cryptocurrency industry have been affected by financial challenges and regulatory scrutiny, including BitGo and FTX.

// Note: This summary highlights the key events related to Prime Trust, focusing on the company's receivership, financial problems, regulatory challenges, and impacts on other industry players.

//   `
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
