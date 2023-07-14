

function handleBotMessage(bot, msg){
    const chatId = msg.chat.id;

    // remove the /nc prefix from the message
    const companyInfo = msg.text.slice(3).trim();
  
    // send a message to the chat acknowledging receipt of their message
  
    // example: let's say the message is in the format "/nc CompanyName, Industry, FundingStatus"
    const [name, url] = companyInfo.split(', ');
  
    bot.sendMessage(chatId, `Uploaded ${name} to Airtable`);
  
  
    // base('YourTableName').create({
    //   "Company Name": name,
    //   "Industry": industry,
    //   "Funding Status": fundingStatus
    // }, function(err, record) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(record.getId());
    // });
}

module.exports = handleBotMessage;