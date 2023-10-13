const axios = require("axios");


async function getArticleData() {
    try {
      const json = await axios.get(
        "https://api.csvgetter.com/WqoKxEOgHdYKgpSfXAl6"
      );
      const res = json.data;
      return res;
    } catch (error) {
      console.error(error);
    }
  }


  module.exports = { getArticleData}