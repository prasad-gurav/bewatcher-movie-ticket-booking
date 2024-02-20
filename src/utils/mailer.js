"use strict";
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dev.psgurav@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
// export async function sendEmail() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'dev.psgurav@gmail.com', // sender address
//     to: "psgurav2001@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);

// }


