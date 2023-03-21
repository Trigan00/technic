const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const mailer = (to, link) => {
  transporter.sendMail(
    {
      from: "RinazTechnic <mytest_90@mail.ru>",
      to,
      subject: "Account activation on " + process.env.API_URL,
      text: "",
      html: `
              <div>
                  <h1>To activate, follow the link</h1>
                  <a href="${link}">${link}</a>
              </div>
          `,
    },
    (error, info) => {
      if (error) {
        console.log("Something went wrong", error);
      }
      if (info) {
        console.log("Mail send successfully");
      }
    }
  );
};

module.exports = mailer;
