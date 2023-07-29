const nodemailer = require("nodemailer");
require("dotenv").config();
const Airtable = require("airtable");

async function sendEmail(html, emails, isTest) {
  const _emails = isTest ? "henry@gvmadvisors.com" : emails;
  const subject = isTest
    ? "Weekly Update (TEST) - " + getDate()
    : "Weekly Update - " + getDate();
  // Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter:
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      // eslint-disable-next-line no-undef
      user: process.env.SENDER_EMAIL, // Your email address
      // eslint-disable-next-line no-undef
      pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });

  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  console.log("EMAILS: ", emails);
  let info = await transporter.sendMail({
    from: "GateCap Automations <henryquillin@gmail.com>",
    to: _emails || "henry@gvmadvisors.com",
    subject: subject,
    html: html,
  });

  return info.response;
}

function getDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const year = date.getFullYear();

  return month + "/" + day + "/" + year;
}

module.exports = { sendEmail };
