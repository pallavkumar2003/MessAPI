// "use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail= async function sendMail(str,data){

    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'sourabhsbg01@gmail.com',
        pass: 'sosaarrzbgjmgbex'
    }
    });

    var Osubject,Otext,Ohtml;
    if (str=="signup") {    
        Osubject = `thank you fro signup ${data.name}`;
        Ohtml = `
        <h1>Welcome to foodapp</h1>
        hope you have a good time !
        here are your detail - 
        Name - ${data.name}
        Email - ${data.email}`
    }
    else if (str=="resetpassword") {
        Osubject = `Reset Password`;
        Ohtml=`
        <h1>foodapp.com</h1>
        here is your link to reset your password !
        ${data.resetPasswordLink}
        `
    }
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp" <sourabhsbg01@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // text: "Hello world?", // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //

// main().catch(console.error);
