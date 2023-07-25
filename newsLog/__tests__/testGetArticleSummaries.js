const {
  summarizeArticles,
  getArticleSummaries,
} = require("../getArticleSummaries");
const { log } = require("console");

// const { describe, it, expect } = require("jest");

describe("summarizeArticles", () => {
  it("Should create a bullet point summary of all articles", async () => {
    const res = await getArticleSummaries();

    for (let company in res) {
      log(company + ": \n");
      log(res[company]);
    }
  }, 20000);
  it("Should create a bullet point summary", async () => {
    const data = [
      {
        Title: "Prime Trust receivership is approved by Nevada judge",
        Company: "Prime Trust",
        "Content Preview":
          "...petition to place embattled crypto custodian Prime Trust into a state regulator\u2019s receivership, according to a statement on ... and owed millions to its customers.\n\nPrime Trust owes over $85 million in fiat currency to its clients, but has just under...\n",
        Links: null,
      },
      {
        Title:
          "Troubled Crypto Custodian Prime Trust Placed In Receivership (1)",
        Company: "Prime Trust",
        "Content Preview":
          "...District Court of Nevada has ordered Prime Trust LLC into receivership amid allegations  the custodian used customer funds ... Nevada, has been appointed the receiver.\n\nPrime Trust once played a significant role in the infrastructure...\n",
        Links:
          "undefined, https://news.bloomberglaw.com/bankruptcy-law/troubled-crypto-firm-prime-trust-put-into-receivership-in-nevada",
      },
      {
        Title:
          "Las Vegas trust company with crypto dealings lands in receivership",
        Company: "Prime Trust",
        "Content Preview":
          "...Guedry has been appointed to oversee Prime Trust LLC on a temporary basis, according to court documents.\n\nThe trust company... \u201d Guedry retired from Bank of Nevada in December.\n\nPrime Trust had been under investigation since November. On March 31...\n",
        Links: null,
      },
      {
        Title: "No title",
        Company: "Prime Trust",
        "Content Preview":
          "We thank the donor who made this contribution! #Primetrust , #Indiavolunteercare , #indiavolunteercaretoursandtravels ... #Primetrustruralhealthmission , #Primetrustchil\n\n#Primetrust , #Indiavolunteercare , #indiavolunteercaretoursandtravels...\n",
        Links:
          "undefined, https://akshayaselfhelpgroupsconfederation.blogspot.com/2023/07/15.html",
      },
      {
        Title: "Troubled Crypto Firm Put Into Receivership in Nevada",
        Company: "Prime Trust",
        "Content Preview":
          "...court has ordered troubled crypto firm Prime Trust LLC into receivership at the request of the Nevada Financial Institutions ... determine the best option to protect Prime Trust\u2019s clients, according to a statement Tuesday from the state...\n",
        Links:
          "undefined, https://www.dispatchist.com/news/troubled-crypto-firm-put-into-receivership-in-nevada",
      },
      {
        Title:
          "Crypto survey finds 47% of investors expect Ethereum to \u2018surpass\u2019 Bitcoin",
        Company: "Prime Trust",
        "Content Preview":
          "Crypto custodian Prime Trust has been ordered by the Eighth Judicial District Court of Nevada, where the company has its headquarters, to be put into receivership after the state ordered...\n",
        Links: null,
      },
      {
        Title: "Nevada Court Orders Prime Trust To Be Put Into Receivership",
        Company: "Prime Trust",
        "Content Preview":
          "...As Prime Trust\u2019s Receiver\n\nBloomberg, the Eighth Judicial District Court of Nevada ordered Las Vegas-based Prime Trust into... \n\nGuedry will oversee the day-to-day operations of Prime Trust and make decisions in the best interest of its clients. As...\n",
        Links:
          "undefined, https://projin.co.kr/nevada-court-orders-prime-trust-to-be-put-into-receivership/",
      },
      {
        Title:
          "Nevada court approves regulator\u2019s petition to place Prime Trust into receivership, pending hearing",
        Company: "Prime Trust",
        "Content Preview":
          "...to safeguard Prime Trust\u2019s clients by appointing a receiver.\n\nThe court order requires Prime Trust\u2019s employees and ... order, where Prime Trust was unable to honor customer withdrawals.\n\nThe June 26 petition revealed that Prime Trust owed more...\n",
        Links:
          "undefined, https://nosweatcrypto.com/nevada-court-approves-regulators-petition-to-place-prime-trust-into-receivership-pending-hearing/, https://kryptocloud.ca/nevada-court-approves-regulators-petition-to-place-prime-trust-into-receivership-pending-hearing/, https://bitcoinexchangetoday.com/nevada-court-approves-regulators-petition-to-place-prime-trust-into-receivership-pending-hearing/, https://bitcoinethereumnews.com/tech/nevada-court-approves-regulators-petition-to-place-prime-trust-into-receivership-pending-hearing/, https://www.newslocker.com/en-us/news/cryptocurrency/ex-ftx-coo-constance-wang-joins-crypto-fund-sino-global/",
      },
      {
        Title:
          "Pending Hearing, Nevada Court Approves Regulator\u2019s Petition To Place Prime Trust In Receivership",
        Company: "Prime Trust",
        "Content Preview":
          "...receiver for Prime Trust following a June 26 petition filed by the state\u2019s financial regulator. Prime Trust will have the ... customers,\u201d stated the NFID. The order requires Prime Trust employees and officers, to a large extent, not to take any...\n",
        Links: null,
      },
      {
        Title: "Prime Trust receivership is approved by Nevada judge",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust receivership is approved by Nevada judge ... petition to place embattled crypto custodian Prime Trust into a state regulator\u2019s receivership, according to a statement on...\n",
        Links:
          "undefined, https://headtopics.com/us/11-mustangs-die-in-nevada-roundup-caught-on-video-41359346, https://headtopics.com/us/toddler-dies-from-rare-brain-eating-amoeba-in-nevada-41370995",
      },
      {
        Title:
          "Prime Trust Put Into Receivership Amid Shortfall in Funds, Charges It Misused Customer Money",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust Put Into Receivership Amid Shortfall in Funds, Charges It Misused Customer...\n",
        Links:
          "undefined, https://www.newslocker.com/en-us/news/cryptocurrency/shinhan-bank-scb-techx-pilot-cross-border-stablecoin-payments-on-the-hedera/, https://inspired-verse.blogspot.com/2023/07/prime-trust-put-into-receivership-amid.html",
      },
      {
        Title:
          "Nevada judge approves Prime Trust\u2019s receivership application",
        Company: "Prime Trust",
        "Content Preview":
          "...wallets.\n\nJudge approves Prime Trust\u2019s receivership request\n\nPrime Trust placed in receivership after court grants NFID ... judge approved the petition to place Prime Trust in receivership.\n\nGet started in crypto easily by following crypto signals...\n",
        Links: null,
      },
      {
        Title:
          "ARK Invest CEO Says Firm Is Still Bullish On Coinbase Despite Selling COIN Stocks",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust will have the opportunity to show why a petition from the Nevada Financial Institutions Division should not be permanently granted in an Aug. 22 hearing.\n",
        Links: null,
      },
      {
        Title: "Nevada court orders Prime Trust into temporary receivership",
        Company: "Prime Trust",
        "Content Preview":
          "That hearing could otherwise affect Prime Trust\u2019s ability to operate.\n\nPrime Trust crisis began nearly one month ago\n\nThe ... consent of Prime Trust LLC, signifying the seriousness of the situation.\n\nPrevious reports indicated that Prime Trust had a...\n",
        Links:
          "undefined, https://satoshialerts.com/nevada-court-orders-prime-trust-into-temporary-receivership/, https://bitrss.com/news/318199/nevada-court-orders-prime-trust-into-temporary-receivership, https://block.cc/news/64b72b3c23d58978dd6cc952, https://cryptonewsglobal.net/2023/07/18/nevada-court-orders-prime-trust-into-temporary-receivership/, https://trendnewsonlinetoday.blogspot.com/2023/07/nevada-court-orders-prime-trust-into.html, https://bitcoinethereumnews.com/tech/nevada-court-orders-prime-trust-into-temporary-receivership/",
      },
      {
        Title:
          "Nevada Court Orders Prime Trust To Be Put Into Receivership \u2013 Crypto Digital Currency News \u00a9",
        Company: "Prime Trust",
        "Content Preview":
          "...Nevada court has ordered crypto custodian Prime Trust to be put into receivership. The former CEO of the Bank of Nevada has ... customer funds.  Crypto custody firm Prime Trust has been placed into receivership by a Nevada court less than a month after...\n",
        Links: null,
      },
      {
        Title: "Nevada court approves regulator\u2019s petition to",
        Company: "Prime Trust",
        "Content Preview":
          "Nevada court approves regulator\u2019s petition to place Prime Trust into receivership, pending hearing\n\n18 Jul 2023\n",
        Links: null,
      },
      {
        Title: "untied states Archives",
        Company: "Prime Trust",
        "Content Preview":
          "The Eighth Judicial District Court of Nevada has granted a petition from the state\u2019s Financial Institutions Division (NFID) placing crypto custodian Prime Trust into receivership, \u2026\n",
        Links: null,
      },
      {
        Title:
          "Historic Vitalik Buterin portrait from 2014 being auctioned as NFT",
        Company: "Prime Trust",
        "Content Preview":
          "...alike.\n\nMeta opens AI model up for commercial use with Llama 2\n\nNevada court orders Prime Trust into temporary...\n",
        Links: null,
      },
      {
        Title:
          "...regulator's petition to place Prime Trust in receivership, pending hearing...",
        Company: "Prime Trust",
        "Content Preview":
          "...Custodian Prime Trust into receivership, pending a hearing to show cause.\n\nIn a July 14 filing, a Nevada court ordered the appointment of a receiver for Prime Trust following a June 26 petition from the state financial regulator. Prime Trust will...\n",
        Links: null,
      },
      {
        Title:
          "Crypto Fraudster Sentenced To Nine Years For $248 Million Ponzi Scheme \u2013 Crypto Digital Currency...",
        Company: "Prime Trust",
        "Content Preview":
          "His lavish spending also included a $13,000 payment to Mercedes Benz.\n\nNevada Court Orders Prime Trust To Be Put Into...\n",
        Links: null,
      },
      {
        Title:
          "Troubled cryptocurrency custodian major trust taken into receivership (2)",
        Company: "Prime Trust",
        "Content Preview":
          "...Eighth Judicial District Court has ordered Prime Trust LLC into receivership charge  The custodian used client funds to ... Bank of Nevada has been named receiver.\n\nPrime Trust has played a major role in the infrastructure of\u2026\n\nMention Sources Can...\n",
        Links: null,
      },
      {
        Title:
          "Pending Hearing, Nevada Court Approves Regulator's Petition To Place Prime Trust In Receivership",
        Company: "Prime Trust",
        "Content Preview":
          "...receiver for Prime Trust following a June 26 petition filed by the state\u2019s financial regulator. Prime Trust will have the... \n\nThe Nevada Eighth Judicial District Court ordered Prime Trust LLC to enter temporary receivership pending an August...\n",
        Links: null,
      },
      {
        Title:
          "Nevada Court Orders Prime Trust To Be Put Into Receivership_BlockCC",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust, the leading provider of financial infrastructure for fintech and digital asset innovators, announced a beta program for Prime Trust Crypto IRA, the first IRA solution with a seamless, single API...\n",
        Links: null,
      },
      {
        Title: "Ex-nevada Bank Ceo Named Receiver For Crypto Custodian",
        Company: "Prime Trust",
        "Content Preview":
          "A Nevada state court has appointed the former CEO of the Bank of Nevada as receiver for crypto custodian Prime Trust LLC after the state's financial regulator determined that the business was insolvent and asked the court to step in.\n",
        Links: null,
      },
      {
        Title: "Prime Trust faces bankruptcy and is placed in receivership",
        Company: "Prime Trust",
        "Content Preview":
          "...petitions for custody of the Prime Trust\n\nPrime Trust issues\n\nPrime Trust\u2019s problems reportedly began in late 2021 when the... \n\nLast month, FID also issued a cease and desist order against Prime Trust, citing a significant shortfall of customer...\n",
        Links: null,
      },
      {
        Title:
          "Crypto Custodian Prime Trust Placed Into Receivership Amid Allegations Of Misusing Customers' Funds",
        Company: "Prime Trust",
        "Content Preview":
          "...Prime Trust employees and executives should largely not take any actions that will interfere with the decision.\n\nPrime Trust ... granted.According to the NFID's petition, Prime Trust was operating \"in an unsafe and unsound manner and is insolvent as...\n",
        Links: null,
      },
      {
        Title:
          "Prime Trust Placed Under Temporary Receivership by Nevada Court",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust Placed Under Temporary Receivership by Nevada Court\n\nKey takeaways:\n\nIn a hearing on August 22, Prime Trust ... receiver be appointed for Prime Trust. At a hearing on August 22, Prime Trust will have the chance to argue against the...\n",
        Links: null,
      },
      {
        Title:
          "Troubled Crypto Firm Prime Trust Put Into Receivership in Nevada - Bloomberg Law News",
        Company: "Prime Trust",
        "Content Preview":
          "Troubled Crypto Firm Prime Trust Put Into Receivership in Nevada - Bloomberg Law News\n\nA federal court has ordered troubled firm Prime Trust LLC into receivership at the request of the Nevada Financial Institutions...\n",
        Links: null,
      },
      {
        Title: "Nevada Court Approves Receivership for Prime Trust",
        Company: "Prime Trust",
        "Content Preview":
          "Afghan refugees to arrive in Italy though humanitarian corridor\n",
        Links: null,
      },
      {
        Title:
          "Celsius could repay all USD claims if Bitcoin, Ether prices rose by 2X: Simon Dixon",
        Company: "Prime Trust",
        "Content Preview":
          "\n\nTiffany Fong flames Celsius, FTX and NY Post: Hall of Flame\n\n#Celsius #repay #USD #claims #Bitcoin #Ether #prices #rose #Simon #Dixon\n\nPrime Trust placed in receivership amid insolvency...\n",
        Links: null,
      },
      {
        Title: "Prime Trust placed in receivership amid insolvency risks",
        Company: "Prime Trust",
        "Content Preview":
          "Prime Trust placed in receivership amid insolvency risks\n\nPrime Trust has been placed in receivership ... millions of dollars in fiat and crypto. Prime Trust, a once-bubbling digital assets custody firm, has officially\u2026\n\nLatest...\n",
        Links:
          "undefined, https://bitcoinethereumnews.com/tech/prime-trust-placed-in-receivership-amid-insolvency-risks/",
      },
      {
        Title:
          "Bankruptcy & Restructuring News Headlines for Wednesday Jul 19, 2023",
        Company: "Prime Trust",
        "Content Preview":
          "...petition to place embattled crypto custodian Prime Trust into a state regulator\u2019s receivership, according to a recent court... \n\n: The Eighth Judicial District Court of Nevada has ordered Prime Trust LLC into receivership amid allegations the...\n",
        Links: null,
      },
      {
        Title:
          "Prime Trust put in receivership in the middle of bankruptcy threats",
        Company: "Prime Trust",
        "Content Preview":
          "...applications for receivership of Prime Trust\n\nPrime Trust\u2019s problems\n\nPrime Trust\u2019s lamentations apparently started in ... out a cease-and-desist purchase versus Prime Trust, naming a sizable deficiency in client funds.\n\nBitGo, a leading crypto...\n",
        Links: null,
      },
      {
        Title:
          "Here\u2019s why decentralized finance is actually very centralized",
        Company: "Prime Trust",
        "Content Preview":
          "All of that makes TUSD sound not all that decentralized in the first place.\n\nJust a month before, in June 2023, TrueUSD halted TUSD minting through Prime Trust as TUSD briefly depegged from the dollar.\n\nBaca lebih lanjut: Bagaimana pemerintah AS...\n",
        Links: null,
      },
      {
        Title: "Nasdaq Bails on Crypto Custody Ambition",
        Company: "Prime Trust",
        "Content Preview":
          "While crypto may be a growing market, the regulatory environment remains opaque.\n\nScott Purcell, CEO of Fortress and founder of Prime Trust, distributed an email sharing his thoughts on Nasdaq\u2019s decision. Fortress Trust, a custody provider, may...\n",
        Links: null,
      },
      {
        Title:
          "Crypto This Wednesday: Nasdaq Suspends Digital Asset Custody Launch, Argo Blockchain Sells Shares...",
        Company: "Prime Trust",
        "Content Preview":
          "...enabling self-custody.\n\nPrime Trust ordered to go into liquidation The Prime Trust, a major cryptocurrency custodian facing...\n",
        Links: null,
      },
      {
        Title:
          "Nasdaq halts plans to launch crypto custody service due to regulatory uncertainty",
        Company: "Prime Trust",
        "Content Preview":
          "\n\n\u201cIt\u2019s a tall order to be a US custodian and trust company,\u201d said Terrence Yang, Managing Director at Swan Bitcoin. \u201cIn light of FTX bankruptcy and Prime Trust being in receivership, etc., there\u2019s almost certainly heightened scrutiny among...\n",
        Links: null,
      },
      {
        Title:
          "ZInside newsletter: Prime Trust officially put into receivership / Nasdaq abandons plans...",
        Company: "Prime Trust",
        "Content Preview":
          "...crypto custodian Prime Trust into receivership. As part of the ruling, the Bank of Nevada's former CEO, John Guedry, has been appointed as the receiver.\n\nMore:\n\nGuedry will take over the day-to-day operations of Prime Trust and determine the best...\n",
        Links: null,
      },
      {
        Title:
          "Bitcoin\u2019s \u2018Great Accumulation,\u2019 Binance.US resumes withdrawals\u2026 \u2013 Tradeando",
        Company: "Prime Trust",
        "Content Preview":
          "\n\nFUD of the Week\n\nPrime Trust can\u2019t honor customer withdrawals, says Nevada regulator\n\nPrime Trust\u2019s financial condition is... In a cease and desist order, the regulator claimed Prime Trust\u2019s is in an \u201cunsafe or unsound condition\u201d to continue...\n",
        Links: null,
      },
      {
        Title:
          "Prime Trust: a judicial administrator to try to straighten the bar",
        Company: "Prime Trust",
        "Content Preview":
          "...eaten by American justice. Today it\u2019s Prime Trust which returns to the front of the stage thanks to an order of the court of... Crushing under the debts height of several millions of dollars tens,  Prime Trust had to rely on justice for the management...\n",
        Links: null,
      },
      {
        Title: "DEXs Account For 5% Of Global Stablecoin Trading: Kaiko",
        Company: "Prime Trust",
        "Content Preview":
          "\n\nTUSD also suffered a slight depeg in June after traders shorted the token in response to Prime Trust, a crypto exchange and partner to TUSD\u2019s issuer, halted deposits and withdrawals. Despite the incident, TUSD\u2019s market share grew from less than 1%...\n",
        Links: null,
      },
      {
        Title:
          "Free dental camp at Acharapakkam village in hands with Vel dental team",
        Company: "Prime Trust",
        "Content Preview":
          "Free dental camp at Acharapakkam village in hands with Vel dental team\n\nOn 15.07. 2023 a free dental camp was conducted by Prime Trust in hands with Vel dental team at Acharapakkam. About 70 individuals benefitted from the camp.\n",
        Links: null,
      },
      {
        Title:
          "...News: BitGo Drops Plan To Buy Prime Trust, Faroe Islands Postal Service Launches NFT Stamps...",
        Company: "Prime Trust",
        "Content Preview":
          "...to purchase Prime Trust. The Prime Trust acquisition was expected to give BitGo access to Prime Trust's payment rails and ... countries would have grown significantly if Prime Trust\u2019s Nevada Trust Company had been included. US Lawmaker Seeks Info On...\n",
        Links: null,
      },
      {
        Title:
          "Anchorage sees institutional crypto pie expanding, despite bear market_BlockCC",
        Company: "Prime Trust",
        "Content Preview":
          "...ETF filings. We also saw the news about Prime Trust, and then all the ongoing regulatory uncertainty in the U.S. What are ... safety in the beginning of the year.\n\nPrime Trust is yet another reason as to why this is continuing. In Q1, we actually...\n",
        Links:
          "undefined, https://www.theblock.co/post/239814/anchorage-sees-institutional-crypto-pie-expanding-despite-bear-market",
      },
      {
        Title:
          "Another Crypto Collapse Imminent? What Is Happening to Prime Trust",
        Company: "Prime Trust",
        "Content Preview":
          "Preorder My New Book! \u27a1\ufe0f https://www.amazon.com/dp/1394210329?ref _=cm_sw_r_apin_dp_WCJPX95VD6PT9QHE7YNS\\_2\n \nEveryone is afraid that they will lose their seed phrase and lose access to their wallets. This is why a lot of crypto holders put their trust...\n",
        Links:
          "undefined, https://player.fm/series/the-bitboy-crypto-podcast/another-crypto-collapse-imminent-what-is-happening-to-prime-trust",
      },
      {
        Title: "The False Promises of Crypto Payments App Strike",
        Company: "Prime Trust",
        "Content Preview":
          "...their bitcoin balance.\n\nRecently, just weeks before Strike\u2019s former custodian Prime Trust filed for bankruptcy, Strike transitioned to self-custody. This means that customers bitcoin are stored inhouse.\n\nIn his post announcing the move, Mallers...\n",
        Links: null,
      },
      {
        Title:
          "J&J's strong quarter was amplified by new details around its big Kenvue consumer unit stake",
        Company: "Prime Trust",
        "Content Preview":
          "...Consolidates Below $31,000 Following Prime Trust Liquidation \u2013 Market Updates Bitcoin News\n\nBitcoin, Ethereum Technical ... Consolidates Below $31,000 Following Prime Trust Liquidation \u2013 Market Updates Bitcoin News,After briefly rising above...\n",
        Links: null,
      },
      {
        Title: "No Title",
        Company: "Prime Trust",
        "Content Preview":
          "But there\u2019s one\u2026#dtc #lbma #mtgox #bitfinex #primetrust #nevadatrust #trustcharter #por #kraken #bitmex (Source: Reuters...\n",
        Links: null,
      },
      {
        Title:
          "Kuwait banned transactions with cryptocurrencies, Binance integrated the Lightning Network",
        Company: "Prime Trust",
        "Content Preview":
          "...receiver for Prime Trust\n\nDistrict Court of the State of Nevada ordered crypto custodian Prime Trust to initiate bankruptcy ... Bank of Nevada President John Gedra.\n\nPrime Trust\u2019s liabilities in fiat amount to $85.67 million, while assets at its...\n",
        Links: null,
      },
      {
        Title:
          "Trader takes $4M short position on TrueUSD as issuer halts mints and redemptions - Cointelegraph",
        Company: "Prime Trust",
        "Content Preview":
          "...Business and Industry against Prime Trust. In response to the Prime Trust situation, the TrueUSD issuer clarified that it ... Prime Trust, according to an announcement on June 8. However, On June 22, BitGo announced on Twitter that it had of Prime...\n",
        Links: null,
      },
      {
        Title:
          "[New post] The TCB Weekly News Roundup, ending July 23, 2023 \u2013 Lotsa #DeFi",
        Company: "Prime Trust",
        "Content Preview":
          "...services have been discontinued.- Nevada court approves regulator's petition to place Prime Trust into receivership, pending hearing- 5 emerging digital finance trends to watch- Here's why decentralized finance is actually very centralized- Celsius...\n",
        Links: null,
      },
      {
        Title:
          "The crypto industry is embracing self-regulation.it\u2019s time for washington to join",
        Company: "Prime Trust",
        "Content Preview":
          "Gox to Bitfinex, from Quadriga to FTX, and most recently, Prime Trust, in crisis after crisis. Those of us who believe in... This is necessary, but only part of the solution. Prime Trust, a Nevada trust company, recently revealed that it had lost...\n",
        Links: null,
      },
      {
        Title:
          "The crypto industry is embracing self regulation. It\u2019s time Washington gets on board",
        Company: "Prime Trust",
        "Content Preview":
          "Gox to Bitfinex to Quadriga to FTX and, most recently, Prime Trust. Those of us who believe in the promise of digital... This is necessary, but only part of the solution. Prime Trust, which recently revealed it had lost $82 million in client...\n",
        Links:
          "undefined, https://www.inferse.com/635715/the-crypto-industry-is-embracing-self-regulation-its-time-washington-gets-on-board/",
      },
      {
        Title:
          "US FSC Chairman eyes regulatory clarity for crypto, stablecoin ecosystems",
        Company: "Prime Trust",
        "Content Preview":
          "...BNB, XRP, ADA, DOGE, SOL, MATIC, LTC, DOT\n\nTrueUSD (TUSD) Remains Unaffected by Prime Trust Suspension of Deposits and Withdrawals\n\nRipple CEO Slams US SEC for Creating Mess around XRP...\n",
        Links: null,
      },
      {
        Title: "Monday, July 24, 2023",
        Company: "Prime Trust",
        "Content Preview":
          "...and body temperature were checked. The children cooperated well for the checkup. #Primetrust,#Indiavolunteercare,#indiavolunteercaret oursandtravels, #Akshayaselfhelpgroupsconfederation,#Aad haraprojectforhomeless...\n",
        Links: null,
      },
      {
        Title: "Watch out finfluencers - (24/07)",
        Company: "Prime Trust",
        "Content Preview":
          "\n\n\ud83c\udf0d NYDIG has claimed that spot EFTs for Bitcoin could increase the demand for BTC to $30bn.\n\n\ud83c\udf0d Prime Trust has been put into receivership by a judge in Nevada.\n\n\ud83c\udf0d The digital yuan has surpassed $250bn in transactions in the 1.5years since...\n",
        Links: null,
      },
    ];

    const res = await summarizeArticles(data, "Prime Trust");
    console.log(res);
  });
});
