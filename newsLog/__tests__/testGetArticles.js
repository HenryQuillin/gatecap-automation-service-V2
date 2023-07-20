const { compareArticles, isSimilar } = require("../getArticles");
// const { describe, it, expect } = require("jest");

describe('isSimilar', () => {
  it('should return true for very similar articles', () => {
    const article1 = {
      title: 'Provenance Blockchain Market Capitalization Hits $2.72 Billion',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion...'
    };

    const article2 = {
      title: 'Provenance Blockchain (hash) Self Reported Market Capitalization Hits $2.72 Billion',
      content_preview: 'In the food sector, the benefits are attractive. Provenance Blockchain has a total market cap of $2.72 billion...'
    };

    expect(isSimilar(article1, article2)).toBe(true);
  });
  it('should return true for somewhat similar articles', () => {
    const article1 = {
      title: 'Provenance Blockchain Market Capitalization Hits $2.72 Billion',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion and $219.42 worth of Provenance Blockchain was traded on exchanges in the last day...'
    };
  
    const article2 = {
      title: 'Provenance Blockchain Market Cap Reaches over $2.5 Billion',
      content_preview: 'rfrf'
    };
  
    expect(isSimilar(article1, article2)).toBe(true);
  });
  it('should return true for somewhat similar articles - variation #2', () => {
    const article1 = {
      title: 'Provenance Blockchain (hash) Trading Down 36.2% Over Last Week',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion and $219.42 worth of Provenance Blockchain was traded on exchanges in the last day...'
    };
  
    const article2 = {
      title: 'Provenance Blockchain Price Down 36.2% This Week (hash)',
      content_preview: 'rfrf'
    };
  
    expect(isSimilar(article1, article2)).toBe(true);
  });
  it('should return true for somewhat similar articles - variation #3', () => {
    const article1 = {
      title: 'Nevada judge approves Prime Trust’s receivership application',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion and $219.42 worth of Provenance Blockchain was traded on exchanges in the last day...'
    };
  
    const article2 = {
      title: 'Nevada judge approves Prime Trust into temporary receivership',
      content_preview: 'rfrf'
    };
  
    expect(isSimilar(article1, article2)).toBe(true);
  });
  it('should return true for same content preview', () => {
    const article1 = {
      title: 'Nevada judge approves Prime Trust’s receivership application',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion and $219.42 worth of Provenance Blockchain was traded on exchanges in the last day...'
    };
  
    const article2 = {
      title: 'fefef',
      content_preview: 'Provenance Blockchain has a  cap of $2.72 billion and $219.42 worth of Provenance Blockchain was traded on exchanges in the last day...'
    };
  
    expect(isSimilar(article1, article2)).toBe(true);
  });

  it('should return false for dissimilar articles', () => {
    const article1 = {
      title: 'Provenance Blockchain Market Capitalization Hits $2.72 Billion',
      content_preview: 'Provenance Blockchain has a market cap of $2.72 billion...'
    };

    const article2 = {
      title: 'Unrelated Article Title',
      content_preview: 'Unrelated content preview...'
    };

    expect(isSimilar(article1, article2)).toBe(false);
  });
});

describe("compareArticles", () => {
  it("should merge slightly similar articles", () => {
    const articles = [
      // existing articles
      {
        type: "news",
        title: "Provenance Blockchain Market Capitalization Hits $2.72 Billion",
        content_preview: "Provenance Blockchain has a market cap of $2.72 billion...",
        source: "existing-source.com",
        links: "https://existing-source.com/existing-article",
        company: "Provenance",
        alertQueryString: "Provenance test",
        alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
        date: "2023-06-06",
      },
      // other existing articles...
    ];
  
    const newArticle = {
      type: "blogs",
      title: "Provenance Blockchain (hash) Self Reported Market Capitalization Hits $2.72 Billion",
      content_preview: "In the food sector, the benefits are attractive. Provenance Blockchain has a total market cap of $2.72 billion...",
      source: "new-source.com",
      links: "https://new-source.com/new-article",
      company: "Provenance",
      alertQueryString: "Provenance test",
      alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
      date: "2023-06-06",
    };

    compareArticles(articles, newArticle);

    const initialArticlesLength = articles.length;

    // If the new article was merged, the length of the articles array should not change
    expect(articles.length).toEqual(initialArticlesLength);

    // Check if the last article in the array has the expected merged data
    const lastArticle = articles[articles.length - 1];
    expect(lastArticle.source).toContain(newArticle.source);
    expect(lastArticle.links).toContain(newArticle.links);
  });
  
  
  
  
  
  it("should merge similar articles", () => {
    const articles = [
      // existing articles
      {
        type: "news",
        title:
          "Provenance Blockchain (HASH) Price Tops $0.0222 on Exchanges",
        content_preview:
          "...hours: aProvenance Blockchain Provenance Blockchain Token Profile According to CryptoCompare, “Provenance Blockchain is a ... such as Provenance Blockchain directly using U.S. dollars. Investors seeking to acquire Provenance Blockchain should first...",
        source: "americanbankingnews.com",
        links:
          "https://www.americanbankingnews.com/2023/06/06/provenance-blockchain-hash-self-reported-market-capitalization-hits-2-72-billion.html",
        company: "Provenance",
        alertQueryString: "Provenance test",
        alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
        date: "2023-06-06",
      },
      // other existing articles...
    ];

    const newArticle = {
      type: "blogs",
      title:
        "Provenance Blockchain Price Reaches $0.0222 on Top Exchanges (HASH)",
      content_preview:
        "Provenance Blockchain Price Reaches $0.0222 on Top Exchanges (HASH) Provenance Blockchain (HASH) traded flat ... Provenance Blockchain has traded down 36.Provenance Blockchain has a market cap of $2.",
      source: "zolmax.com",
      links:
        "https://zolmax.com/investing/provenance-blockchain-hash-self-reported-market-capitalization-hits-2-72-billion/9077952.html",
      company: "Provenance",
      alertQueryString: "Provenance test",
      alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
      date: "2023-06-06",
    };

    const initialArticlesLength = articles.length;

    compareArticles(articles, newArticle);

    // If the new article was merged, the length of the articles array should not change
    expect(articles.length).toEqual(initialArticlesLength);

    // Check if the last article in the array has the expected merged data
    const lastArticle = articles[articles.length - 1];
    expect(lastArticle.source).toContain(newArticle.source);
    expect(lastArticle.links).toContain(newArticle.links);
  });

  it("should merge identical articles", () => {
    const articles = [
      // existing articles
      {
        type: "news",
        title:
          "Provenance Blockchain (hash) Self Reported Market Capitalization Hits $2.72 Billion",
        content_preview:
          "...s. Provenance Blockchain has a total market capitalization of $2.72 billion...",
        source: "americanbankingnews.com",
        links:
          "https://www.americanbankingnews.com/2023/06/06/provenance-blockchain-hash-self-reported-market-capitalization-hits-2-72-billion.html",
        company: "Provenance",
        alertQueryString: "Provenance test",
        alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
        date: "2023-06-06",
      },
      // other existing articles...
    ];

    const newArticle = {
      type: "blogs",
      title:
        "Provenance Blockchain (hash) Self Reported Market Capitalization Hits $2.72 Billion",
      content_preview:
        "In the food sector, the benefits are particularly attractive...",
      source: "zolmax.com",
      links:
        "https://zolmax.com/investing/provenance-blockchain-hash-self-reported-market-capitalization-hits-2-72-billion/9077952.html",
      company: "Provenance",
      alertQueryString: "Provenance test",
      alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
      date: "2023-06-06",
    };

    const initialArticlesLength = articles.length;

    compareArticles(articles, newArticle);

    // If the new article was merged, the length of the articles array should not change
    expect(articles.length).toEqual(initialArticlesLength);

    // Check if the last article in the array has the expected merged data
    const lastArticle = articles[articles.length - 1];
    expect(lastArticle.source).toContain(newArticle.source);
    expect(lastArticle.links).toContain(newArticle.links);
  });

  it("should add new unique articles", () => {
    const articles = [
        // existing articles
        {
          type: "news",
          title: "Provenance Blockchain (hash) Self Reported Market Capitalization Hits $2.72 Billion",
          content_preview: "...s. Provenance Blockchain has a total market capitalization of $2.72 billion...",
          source: "americanbankingnews.com",
          links: "https://www.americanbankingnews.com/2023/06/06/provenance-blockchain-hash-self-reported-market-capitalization-hits-2-72-billion.html",
          company: "Provenance",
          alertQueryString: "Provenance test",
          alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
          date: "2023-06-06",
        },
        // other existing articles...
      ];
      
      const newUniqueArticle = {
        type: "blogs",
        title: "Unique Article Title",
        content_preview: "Unique content preview...",
        source: "unique-source.com",
        links: "https://unique-source.com/unique-article",
        company: "Provenance",
        alertQueryString: "Provenance test",
        alertEmailURL: "https://mail.google.com/mail/u/3/#inbox/undefined",
        date: "2023-06-07",
      };
      

    const initialArticlesLength = articles.length;

    compareArticles(articles, newUniqueArticle);

    // If the new article was unique, the length of the articles array should increase by 1
    expect(articles.length).toEqual(initialArticlesLength + 1);

    // Check if the last article in the array is the new unique article
    const lastArticle = articles[articles.length - 1];
    expect(lastArticle).toEqual(newUniqueArticle);
  });
});
