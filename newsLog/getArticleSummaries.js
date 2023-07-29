if (process.env.PORT == null || process.env.PORT == "") {
  require("dotenv").config();
} else {
  require("dotenv").config({ path: "/etc/secrets/.env" });
}

const _ = require("lodash");

const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

// eslint-disable-next-line no-undef

const configuration = new Configuration({
  // eslint-disable-next-line no-undef
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);



async function summarizeArticles(articleData, companyName) {
  // let articles = articleData.map(article => `${article.Title}: ${article['Content Preview']}`).join("\n");
  let articles = JSON.stringify(articleData, null, 2);

  truncateText(articles, 55000);

  let prompt = `As an AI developed by OpenAI, you have been tasked with assisting in the monitoring of our current portfolio companies. Specifically, your role is to digest and summarize the key events and news related to our portfolio company, ${companyName}, over the past week.

The audience for this summary is a senior executive who will use your summary to write an investor report. They already have a deep understanding of the company, so you do not need to explain what the company does or provide any analysis or recommendations. Your task is purely to summarize the recent events in a comprehensive manner.

Please generate a summary of the key events from these articles:



Here is the collected news data related to ${companyName} for the past week:

${articles} 


Do not make a bullet for each article. Rather, summarize the key events from the articles. So if two articles talk about the same event, combine them into one bullet. The less bullet points the better.

`;

  try {
    console.log("generating summmary for: ", companyName);
    const response = await openai.createChatCompletion({
      messages: [
        { role: "system", content: "You are a helpful AI assistant" },
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
function formatReports(data) {
  let formattedData = "";
  for (let company in data) {
    formattedData += `${company}:\n${data[company]}\n\n`;
  }
  return formattedData;
}

async function getArticleSummaries(articlesData) {
  try {
    // const articlesData = await getArticleData();
    const groupedByCompany = _.groupBy(articlesData, "Company");

    let reports = {};

    for (let company in groupedByCompany) {
      const summary = await summarizeArticles(
        groupedByCompany[company],
        company
      );
      reports[company] = summary;
    }

    const formattedReport = formatReports(reports);
    return [reports, formattedReport];
  } catch (error) {
    console.error(error);
  }
}

function truncateText(string, maxLength) {
  if (string.length > maxLength) {
    return string.substring(0, maxLength) + "...";
  } else {
    return string;
  }
}

module.exports = { getArticleSummaries, summarizeArticles };
