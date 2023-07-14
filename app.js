const express = require("express");

const bodyParser = require("body-parser");
const { getArticles } = require("./getArticles");
const { getInfo } = require("./getInfo");
const { getInfoAll } = require("./getInfoAll");
const { getReport } = require("./getReport");
const TelegramBot = require("node-telegram-bot-api");
const Airtable = require("airtable");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
// listen for any kind of message
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");

  // TODO: extract company info from the message
  // and upload to airtable
});

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

app.post("/getReport", (req, res) => {
  getReport(req, res);
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
