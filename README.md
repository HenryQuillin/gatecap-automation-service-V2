# Overview

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


