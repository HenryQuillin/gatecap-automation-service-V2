require("dotenv").config();

const axios = require("axios");
const csv = require("csv-parser");
const { Configuration, OpenAIApi } = require("openai");

// eslint-disable-next-line no-undef

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getArticleData() {
  try {
    // const response = await axios.get('https://api.csvgetter.com/files/f0bc117df8?type=csv');
    const response =
      "Title,Company,Type,Content Preview,Link,Source,Alert Query String,Alert Email URL,Date,CreatedCrypto News: 🟪 Broken precedent,Prime Trust,blogs,'- Read more*Sponsored contentTop StoriesCME Group to add ether/bitcoin ratio futures in July pending regulatory approval —  Read   Emerging Prime Trust ties have traders fretting over TUSD — ReadBlockchain Association says legally, Gensler has...',https://bitcointrader2022.blogspot.com/2023/06/broken-precedent.html,bitcointrader2022.blogspot.com,'PrimeTrust OR ''Prime Trust''',https://mail.google.com/mail/u/3/#inbox/1890a08b9458fd2e,2023-06-29,2023-06-30ApeCoin DAO Votes In Two New Special Council Seats Replacing Alexis Ohanian and Yat Siu,Prime Trust,blogs,'...Crypto NinjaPost navigationPrevious Prime Trust Is Having a Bad...',https://cryptonewsday.wordpress.com/2023/06/30/apecoin-dao-votes-in-two-new-special-council-seats-replacing-alexis-ohanian-and-yat-siu/,cryptonewsday.wordpress.com,'PrimeTrust OR ''Prime Trust''',https://mail.google.com/mail/u/3/#inbox/1890942cfc666d58,2023-06-29,2023-06-29Coinbits Hit by Prime Trust Regulatory Freeze,Prime Trust,news,'...asset platform with a relationship with Prime Trust – now insolvent – that finds that some customers cannot access their ... directly to Bitcoin Twitter about what the Prime Trust meltdown means for Coinbits.— Coinbits | DCA into bitcoin...',https://www.crowdfundinsider.com/2023/06/209452-coinbits-hit-by-prime-trust-regulatory-freeze/,crowdfundinsider.com,'PrimeTrust OR ''Prime Trust''',https://mail.google.com/mail/u/3/#inbox/1890942cfc666d58,2023-06-29,2023-06-29Emerging Prime Trust ties have traders fretting over TUSD,Prime Trust,news,'...or TUSD assets reside with Prime Trust. Representatives for Prime Trust and TUSD did not return requests for comment or... Wait, the auditor who has been attesting to the $TUSD audits (in Prime Trust) was the old FTX auditor who set up under a...','https://cryptonews.net/news/altcoins/21250952/, https://ro.bitcoinethereumnews.com/tech/emerging-prime-trust-ties-have-traders-fretting-over-tusd/','cryptonews.net, ro.bitcoinethereumnews.com','PrimeTrust OR ''Prime Trust''',https://mail.google.com/mail/u/3/#inbox/1890942cfc666d58,2023-06-29,2023-06-29Prime Trust Is Having a Bad Month,Prime Trust,news,'Prime Trust may be taken over by the state of Nevada, and the situation seems alarming.','https://www.15minutenews.com/article/2023/06/29/231054454/prime-trust-is-having-a-bad-month/, https://www.newslocker.com/en-us/news/cryptocurrency/prime-trust-is-having-a-bad-month/, https://eleven87.blog/2023/06/29/prime-trust-is-having-a-bad-month/','15minutenews.com, newslocker.com, eleven87.blog','PrimeTrust OR ''Prime Trust''',https://mail.google.com/mail/u/3/#inbox/1890942cfc666d58,2023-06-29,2023-06-29'LayerZero’s market shifting, there’s a better environment ahead for everyone, CEO says',Prime Trust,news,'...LayerZero provides for it.";
    // let data = [];
    // response.data
    //     .pipe(csv())
    //     .on('data', (row) => {
    //         data.push(row);
    //     })
    //     .on('end', () => {
    //         console.log('CSV successfully processed');
    //     });
    // return data;
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function summarizeArticles(csvData) {
  // let csvAsString = JSON.stringify(csvData);
  let prompt =
    "Here is csv data of the news log of my venture capital firm. It contains the title, snippet with mentioned portfolio company, and relevant portfolio company of a collection of articles gathered from the past week. Can you summarize this into an investor update?\n" +
    csvData;

  try {
    const response = await openai.createChatCompletion({
      messages: [
        { role: "system", content:prompt },
        { role: "user", content: "Say this is a test" },
      ],
      model: "gpt-3.5-turbo-16k",
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}

async function getReport(req, res) {
  try {
    const csvData = await getArticleData();
    const summary = await summarizeArticles(csvData);
    console.log(summary);
    res.send(summary);
    // Here you would call sendEmail(summary)
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getReport };

// https://api.csvgetter.com/files/f0bc117df8?type=csv
