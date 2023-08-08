## Overview

The service provides the following key features:

- Automated company info scraping from Crunchbase
- News monitoring and logging from various sources
- Weekly summary report generation
- Telegram bot integration for new lead capture
- Email to Airtable automation for new leads

## Quick Links 

- [Company Tracking](https://airtable.com/appKfm9gouHkcTC42/tbld5FiqYEYa2pR3t/viwiWetaPfmwLGDhy?blocks=hide)
- [Contacts](https://airtable.com/appKfm9gouHkcTC42/tblk8xCErGVGlFfia/viwGqiL1imOZPDjj6?blocks=hide)
- [News Log](https://docs.google.com/document/d/1k-zjYBD7H4T6kcB3R5zSNFXjFSJza1A9H_aSVE6EbqU/edit?usp=sharing)
- [GateCap Automation Service Documentation](https://t.me/+3IcAdT7cQcNjODRh)
- [GateCap - New Leads Telegram Chat](https://t.me/+3IcAdT7cQcNjODRh)
- [GateCap - Weekly Reports Telegram Chat](https://t.me/+SRIgPdgEMFJmNzkx)

# Dependencies

### Core:
- [express](https://expressjs.com/) - Web framework
- [airtable](https://github.com/Airtable/airtable.js) - Airtable API wrapper
- [puppeteer](https://pptr.dev/) - Headless browser

### Utilities:
- [axios](https://github.com/axios/axios) - HTTP requests
- [cheerio](https://cheerio.js.org/) - HTML parsing
- [csv-parser](https://github.com/mafintosh/csv-parser) - CSV parsing
- [nodemailer](https://nodemailer.com/about/) - Email sending
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- [lodash](https://lodash.com/) - Utility library
- [better-queue](https://github.com/diamondio/better-queue) - Task queue with priorities
- [moment-timezone](https://momentjs.com/timezone/) - Timezone support for Moment.js

### APIs:
- [googleapis](https://github.com/googleapis/google-api-nodejs-client) - Google API client
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram bot API
- [openai](https://beta.openai.com/) - OpenAI API

### Tools:
- [pm2](https://pm2.keymetrics.io/) - Production process manager
- [eslint](https://eslint.org/) - Linting
- [jest](https://jestjs.io/) - Testing framework
- [prettier](https://prettier.io/) - Code formatting

# How to run locally

**Prerequisites**: Node.js & npm

1. **Clone the repository**:

    ```bash
    git clone https://github.com/HenryQuillin/gatecap-automation-service-V2.git
    cd gatecap-automation-service-V2
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Add .env variables**:

   See 'Secrets' section in [this document](https://docs.google.com/document/d/1k-zjYBD7H4T6kcB3R5zSNFXjFSJza1A9H_aSVE6EbqU/edit?usp=sharing).

4. **Run the service**:

   - Recommended:

     ```bash
     npx nodemon app.js
     ```

   - If you prefer not to use nodemon, the following works too (doesn't support hot reloading):

     ```bash
     node app.js
     ```

5. **Verify the service**:

   Ensure that the service is live at `localhost:3000`. It should display:

   > Welcome to the GateCap Automation Service: [https://github.com/HenryQuillin/gatecap-automation-service-V2](https://github.com/HenryQuillin/gatecap-automation-service-V2)


# Testing

There are two ways to query the endpoints: via Postman or via Zapier. Below are the steps to test via Zapier:

1. **Install and set up ngrok**, if you haven't already:

   This will create a public route link to your local deployment.

2. **Run ngrok**:

    ```bash
    ngrok http 3000
    ```

3. **Run the service**:

    ```bash
    npx nodemon app.js
    ```

4. **Edit the desired Zapier automation**:

    - Enter the ngrok link generated from step 2.
    - Click "test action".

Note: If you're testing with Postman, adjust the steps accordingly.

## Unit Tests

This project uses Jest for unit testing.

### Running tests:

```bash
npm run test
``` 

### Adding tests:
New tests can be added under the __tests__ folder.





# Deployment

 - This repo is a web service hosted on [Render.com](https://render.com): [https://dashboard.render.com/web/srv-ci1n8jvdvk4tegdmr6f0](https://dashboard.render.com/web/srv-ci1n8jvdvk4tegdmr6f0). 
- Containerized with Docker.

# Monitoring and Logging

- Logs are streamed to Betterstack and can be accessed at: [https://logs.betterstack.com/users/join/d6SMJwLXLLVsHmnm7Ede6s4J](https://logs.betterstack.com/users/join/d6SMJwLXLLVsHmnm7Ede6s4J).
- Logs can also be found at: [https://dashboard.render.com/web/srv-ci1n8jvdvk4tegdmr6f0/logs](https://dashboard.render.com/web/srv-ci1n8jvdvk4tegdmr6f0/logs).


# API Schema 

**Base url**: `https://gatecap-automation-service.onrender.com/`

## `/extract`

### Request:
```
POST /extract

Body:
{
  "subject": "Email subject string",
  "html": "Email HTML body string"
}
``` 

### Response 
``` 
[
  {
    "type": "news",
    "title": "Article title extracted from email",
    "content_preview": "Short excerpt from article content",
    "source": "List of source domains",
    "links": ["Array of article URLs"],
    "company": "Extracted company name",
    "companyRecordId": "Airtable record ID",
    "alertQueryString": "Query terms for this alert",
    "alertEmailUrl": "URL to email containing this alert",
    "date": "ISO date string"
  }
]
``` 

## `/extract`

### Request:
```
POST /getinfo

Body:
{
  "newlyAddedRecordId": "Airtable record ID string"  
}

``` 

### Response 
``` 
"Updated {Company Name}"
``` 


## `/getinfoall`

### Request:
```
POST /getinfoall

Body:
{  }

``` 

### Response 
``` 
"Recieved request. Scraping info for all companies in 'Get Info Batch Queue' table"
``` 

## `/getreport`

### Request:
```
POST /getreport

Body:
{ 
    emails: "comma seperated list of email to send the report to",
    production: "boolean indicating whether to treat this request as a test or not" 
} 

``` 

### Response 
``` 
{link to google doc}
``` 





# Automated Info Gathering 

## Overview 

The Automated Info Gathering feature provides an affordable alternative to obtain the same data available through the Crunchbase Enterprise API.

**Trigger**: Toggle the ‘Gather Info’ field in Airtable.

**Immediate Feedback**: ‘Scraping Status’ field will show ‘In Progress’ within moments.

### Process:

1. Initially, our automation utilizes the free Crunchbase API to fetch basic details such as Logo, Description, URL, and social media links.
2. Subsequently, a headless Chrome instance is initiated to login into Crunchbase, search for the company on the discover page, and retrieve the comprehensive company data.
3. To bypass bot detection, unique proxy servers are engaged for each request.

### Error handling:

- If the company cannot be found on Crunchbase, the ‘Scraping Status’ field will be set to ‘Not found on Crunchbase’.
- If there was an error, the the ‘Scraping Status’ field will be set to ‘Error’. You can view the error message in the ‘Error Details’ field.

## Data Retrieved

- Full Description
- Crunchbase rank 
- Total funding amount 
- Most recent valuation range 
- Date of most recent valuation 
- Founded date
- Contact email 
- Investor type
- Investment stage 
- Industry groups 
- Industries 
- Estimated revenue range 
- Number of articles (found by Crunchbase)
- Founders 
- Number of founders 
- Nuber of employees 
- Number of funding rounds 
- Funding status 
- Last funding date 
- Last funding amount 
- Last funding type 
- Last equity funding amount 
- Last equity funding type 
- Total equity funding amount 
- Top 5 investors 
- Number of investors
- IPO status 
- Similar companies 
- Average visits (6 months) 
- Monthly Visits 
- Monthly visits growth 
- Visit duration 
- Page views per visit 
- Bounce rate 
- Bounce rate growth
- Page views / visit growth 
- Visit duration growth 
- Global Traffic Rank 
- Monthly Rank Change (#)
- Monthly Rank Growth
- Headquarters Location
- Headquarters Regions
- Hub Tags
- Actively Hiring 
- Stock symbol
- Trend Score (7 Days)
- Trend Score (30 Days)
- Trend Score (90 Days)
- Total Products Active 
- Patents Granted 
- Trademarks Registered
- IT Spend

**Trigger**: [https://airtable.com/appKfm9gouHkcTC42/wflbtXtdSAVZfsQ0o](https://airtable.com/appKfm9gouHkcTC42/wflbtXtdSAVZfsQ0o)

**Code**: [https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/getInfo](https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/getInfo)

**API Endpoint**: [https://gatecap-automation-service.onrender.com/getinfo](https://gatecap-automation-service.onrender.com/getinfo)


## How to Add/Remove Fields from the Automated Info Gathering 

1. **Login to Crunchbase**
2. Navigate to saved searches -> [View for Automation](https://www.crunchbase.com/discover/saved/view-for-automation/2fe3a89b-0a52-4f11-b3e7-b7ec2777f00a).
3. Click `Edit View`.

### To Add a Field:

1. Check the checkbox of the field you want to add.
2. Create a new field in the **Company Tracking** table with:
    - **Type** = single line or multiline text
    - **Field name** = name of field in Crunchbase (must be exactly the same)

### To Remove a Field:

1. Uncheck the checkbox of the field you want to remove.
2. Remove that field from the **Company Tracking** table.


# Automated Info Gathering (Batch)

Efficiently extract Crunchbase data for multiple companies simultaneously using the batch info gathering automation.

### Setup:

1. Navigate to the **Companies table** in Airtable.
2. For each company you want data for, check the `Get Info - Batch` field. This action queues the company for scraping.

### Trigger Batch Scraping:

1. Send a POST request to the [https://gatecap-automation-service.onrender.com/getinfobatch](https://gatecap-automation-service.onrender.com/getinfobatch).
   
   #### If you prefer a visual tool:

   - Visit [Reqbin](https://reqbin.com/)
   - Enter the API URL
   - Set the method to POST
   - Click Send.

### Monitoring the Process:

1. View real-time status logs:
   - [Render logs](https://dashboard.render.com/web/srv-ci1n8jvdvk4tegdmr6f0/logs)
   - [Betterstack logs](https://logs.betterstack.com/users/join/d6SMJwLXLLVsHmnm7Ede6s4J)
2. Observe the `Get Info Batch Queue` table in Airtable. Companies will be de-queued as their data is successfully scraped.

### Review Data:

1. Once the scraping process concludes, verify that the information has been populated into the corresponding company records within Airtable.

# Automated News Log

This automation actively monitors new news, blogs, tweets, and discussions, and records them in the **News Log** table.

## How it Works:

### Talkwalker Alerts:
- Talkwalker sends alert emails about the latest content matches based on the set criteria.

### Zapier Integration:
- Zapier monitors the designated inbox for incoming Talkwalker alert emails.
- Upon detecting an alert email, it passes the email’s html into the `/extract` endpoint.

### Data Handling:
1. The triggered script decodes the alert email.
2. Formats the decoded data.
3. Then, uploads the structured data to the Airtable.

### Eliminating Dupes with Algorithm:
- Considering many news sources often republish identical articles, the system uses a Euclidean distance similarity algorithm.
- The algorithm compares each article with others in the same email alert and also against articles from the past two weeks.

### News Log Table Content:
The **News Log** table in Airtable is updated with the following details from each article:
- Article title
- Associated company
- Content type
- Source
- Snippet (highlighting mentions of the associated company)
- Publication date
- Article link

**Trigger**: [https://zapier.com/webintent/edit-zap/194816875](https://zapier.com/webintent/edit-zap/194816875)

**API Endpoint**: [https://gatecap-automation-service.onrender.com/extract](https://gatecap-automation-service.onrender.com/extract)

**Code**: [https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/newsLog](https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/newsLog)


## Adding a Company to the News Tracker

### Via Telegram:
See ‘[Telegram -> Airtable Automation For New Leads](https://docs.google.com/document/d/1k-zjYBD7H4T6kcB3R5zSNFXjFSJza1A9H_aSVE6EbqU/edit#heading=h.wzrpu1jw88ps)’. Make sure to [create a new alert](https://docs.google.com/document/d/1k-zjYBD7H4T6kcB3R5zSNFXjFSJza1A9H_aSVE6EbqU/edit#heading=h.9nkvpiuct21b).

### Via Airtable:
1. Check the ‘Track News’ field next to the company you want to add to the news tracking list.
2. Then, go to [Talkwalker Alerts](https://alerts.talkwalker.com/alerts/manage) and [create a new alert](https://docs.google.com/document/d/1CP-vOb748gLKneK5e0MD2Vd355VyFKqQ23diZeYySxY/edit#heading=h.9nkvpiuct21b).

#### How to Create a New Alert:

1. Go to [Talkwalker Alerts](https://www.talkwalker.com/alerts).
2. Click `CREATE Alerts`.
3. Set the settings as follows:
   - **Search Query**: Enter the name of the company.
   - **Result Type**: Select "Everything". Adjust this as needed.
   - **Language**: Choose "English".
   - **How Often**: Select "As it happens".
   - **How Many**: 
     - For less popular companies, select "All Results".
     - For larger companies with frequent online mentions (e.g., Prime Trust), choose "Only the best results".
   - **Your Email**: Enter dealflow@gate-cap.com.
4. Click preview. If the company has a unique name (like rwa.xyz) you probably can just leave the query as the company name. If you see a lot of unrelated news, you’ll need to refine your search query.
5. To create a strong search query, make use of the boolean operators defined in the [Talkwalker Search Syntax](https://developer.talkwalker.com/docs/query-syntax/boolean-operators) page. Some examples include:
   - `"CoinRoutes" AND (crypto trading)`
   - `"Decent DAO" OR "decent-dao.org"`
   - `(("HamsaPay" OR "Hamsa Pay" OR "Hamsa") AND ("tokenization" OR "alternative assets" OR "blockchain"))`
   - `"Provenance Blockchain Foundation" OR "Provenance Blockchain" OR "Provenance Foundation" OR provenance.io`
6. Click create alert.

# Automated News Report

Every Friday at 3pm EST, an AI generated news report summarizing the key events and developments related to tracked companies over the past week is generated and distributed via the following channels:

- The report is saved as a Google Docs file in the "[Weekly Reports](https://drive.google.com/drive/folders/1JfxG2o_ZzsiigDVKsDbKH2sqEB-bl6J7?usp=sharing)" shared folder on [Google Drive](https://drive.google.com/).
- The weekly report Google Docs link is posted in the GateCap Weekly Reports Telegram channel.
- The Google Docs link is also emailed to the following recipients:
  - frank@gate-cap.com
  - alfred@gvmadvisors.com
  - Emails can be added or removed by editing the 'email' parameter in the [Report Generation Zap](https://zapier.com/editor/199063888/published)
- The report delivery is logged in the "Weekly Reports" Airtable base, capturing the date and link to that week's report.

The report contains sections for companies grouped by their due diligence status in the tracker (e.g. "Invested", "Pending"). Each section has two parts:
1. **Narrative summary** highlighting the most impactful news items and trends of the week for those companies.
2. **Bullet point list** of brief summaries of all key events and news.

**Zapier Trigger**: [https://zapier.com/editor/199063888/published](https://zapier.com/editor/199063888/published)

**API endpoint**: [https://gatecap-automation-service.onrender.com/getreport](https://gatecap-automation-service.onrender.com/getreport)

**Code**: [https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/newsLog](https://github.com/HenryQuillin/gatecap-automation-service-V2/tree/master/newsLog)
