require("dotenv").config();
const nodemailer = require("nodemailer");

const _ = require('lodash');


const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

// eslint-disable-next-line no-undef


// store the entire for investor report data in a json object 
// For each company
  // filter by that company 
  // set the prompt to be the company name and the filtered data 
    // note, the data should be truncated to 15,000 characters
  // run the summarizeArticles function on the prompt
  




const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getArticleData() {
  try {
    const json = await axios.get('https://api.csvgetter.com/files/f0bc117df8?type=json_records&cols=Title,Company,Content Preview,Links');
    const res = json.data;
    return res;
  } catch (error) {
    console.error(error);
  }
}





async function summarizeArticles(articleData, companyName) {
  // let articles = articleData.map(article => `${article.Title}: ${article['Content Preview']}`).join("\n");
  let articles = JSON.stringify(articleData, null, 2);

  truncateText(articles, 55000);

  let prompt =
  `As an AI developed by OpenAI, you have been tasked with assisting in the monitoring of our current portfolio companies. Specifically, your role is to digest and summarize the key events and news related to our portfolio company, ${companyName}, over the past week.

The audience for this summary is a senior executive who will use your summary to write an investor report. They already have a deep understanding of the company, so you do not need to explain what the company does or provide any analysis or recommendations. Your task is purely to summarize the recent events in a comprehensive manner.

Please generate an HTML formatted summary of the key events from these articles in the format (use <ul>/<li> list with 'subject: details' format for the list of events):
  <h2>${companyName}</h2>
 
  <ul>
    <li><strong>Subject</strong>: Details</li>
    ...
    <!-- Include the rest of the individual summaries of the events here -->
  </ul> 



Here is the collected news data related to ${companyName} for the past week:
${articles} 
Do not make a bullet for each article. Rather, summarize the key events from the articles. So if two articles talk about the same event, combine them into one bullet. 
`

// Please provide an exhaustive and comprehensive summary of the key events from these articles. Include source links where necessary`;
// For example, if the articles were about Prime Trust, the summary might look like this:
// -BitGo CEO Reveals Pending Acquisitions Amidst Abandoned Prime Trust Deal: BitGo terminated the acquisition of Prime Trust, raising questions about the stability and future of Prime Trust. The deal was expected to provide financial assistance to Prime Trust. 
// -TrueUSD Depegs on Binance.US, Drops to 80 Cents Against Tether: TrueUSD depegged from its intended value and dropped in value against Tether. The stablecoin's reliance on Prime Trust raised concerns about its stability.
// -Nevada’s Financial Watchdog Seeks Receivership of Crypto Custodian Prime Trust Amidst Insolvency: The Nevada Financial Institutions Division filed a petition to take control of Prime Trust and freeze all its businesses due to insolvency concerns. Prime Trust allegedly lost access to wallets and used customer assets to buy cryptocurrencies.
//  ...
// sources: source1, source2, etc..



  try {
    console.log("generating summmary for: ", companyName);
    const response = await openai.createChatCompletion({
      messages: [
        { role: "system", content:"You are a helpful AI assistant" },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-16k",
    });
    console.log("summary generated for: ", companyName);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("ERROR GENERATING SUMMARY for: ", companyName);

    console.error(error);
  }
}
function formatReports(summaries) {
  let mergedReports = '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody {\nfont-family: Arial, sans-serif;\n}\n\nh1 {\ncolor: #333333;\nfont-size: 24px;\nfont-weight: bold;\nmargin-bottom: 10px;\n}\n\np {\ncolor: #666666;\nfont-size: 16px;\nline-height: 1.5;\n}\n</style>\n</head>\n<body>';

  for (let company in summaries) {
    mergedReports += summaries[company];
  }

  mergedReports += '\n</body>\n</html>';

  return mergedReports;
}




async function getReport(req, res) {
  try {
    const articlesData = await getArticleData();
    const groupedByCompany = _.groupBy(articlesData, "Company"); // Group the data by Company field

    let reports = {};

    // Iterate over each group
    for (let company in groupedByCompany) {
      const summary = await summarizeArticles(groupedByCompany[company],company);
      reports[company] = summary;
    }

    const formattedReport = formatReports(reports);
    let result = await sendEmail(formattedReport, req.body.emails)
    res.send(result); // send the reports as the response
    console.log("Done: ", result)



  } catch (error) {
    console.error(error);
  }
}



async function sendEmail(html, emails) {
  // Async function enables allows handling of promises with await
  
    // First, define send settings by creating a new transporter: 
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true, // Usually true if connecting to port 465
      auth: {
        user: process.env.SENDER_EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
        // ⚠️ For better security, use environment variables set on the server for these values when deploying
      },
    });
    
    // Define and send message inside transporter.sendEmail() and await info about send from promise:
    console.log("EMAILS: ", emails)
    let info = await transporter.sendMail({
      from: 'GateCap Automations <henryquillin@gmail.com>',
      to: emails || 'alfred@gvmadvisors.com, henry@gvmadvisors.com',
      subject: "Weekly Update (TEST)",
      html: html
    });
  
    return info.response; 
  }

  function truncateText(string, maxLength) {
    if (string.length > maxLength) {
      return string.substring(0, maxLength) + "...";
    } else {
      return string;
    }
  }
  
module.exports = { getReport };
