const axios = require("axios");


async function getArticleData() {
    try {
      const json = await axios.get(
        "https://api.csvgetter.com/files/f0bc117df8?type=json_records&cols=Title,Company,Content Preview,Links,Linked Company,Diligence Status"
      );
      const res = json.data;
      return res;
    } catch (error) {
      console.error(error);
    }
  }


  module.exports = { getArticleData}