const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();


const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.HENRY_GATECAPBOT_CHATID;

function sendTelegramMessage(url) {
    const bot = new TelegramBot(botToken);

    const message = `
    🚨Weekly Report (test): ${getDate()}🚨

    ${url}
    `

    bot.sendMessage(chatId, message).then(() => {
        console.log("Message sent successfully");
    }).catch((error) => {
        console.error(error);
    });
}


function getDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();
  
    return month + '/' + day + '/' + year;
  }

module.exports = { sendTelegramMessage };
