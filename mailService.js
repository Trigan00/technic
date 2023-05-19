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

const activationMailer = (to, link) => {
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
        console.log("Activation mail send successfully");
      }
    }
  );
};

const orderMailer = (email, username, technicname) => {
  transporter.sendMail(
    {
      from: "RinazTechnic <mytest_90@mail.ru>",
      to: process.env.AMDIN_EMAIL,
      subject: "Новый заказ " + process.env.API_URL,
      text: "",
      html: `
              <div>
                  <h1>Заказ от пользователя ${email} (${username})</h1>
                  <p>Заказ техники "${technicname}"</p>
                  <a href="${process.env.CLIENT_URL}/admin/orders">Подробнее</a>
                  </div>
          `,
    },
    (error, info) => {
      if (error) {
        console.log("Something went wrong", error);
      }
      if (info) {
        console.log("Order mail send successfully");
      }
    }
  );
};

const forgetPasswordMailer = (to, link) => {
  transporter.sendMail(
    {
      from: "RinazTechnic <mytest_90@mail.ru>",
      to,
      subject: "Password Reset Request on " + process.env.API_URL,
      text: "",
      html: `
              <div>
                  <h1>Please click on this link to reset your password</h1>
                  <a href="${link}">${link}</a>
              </div>
          `,
    },
    (error, info) => {
      if (error) {
        console.log("Something went wrong", error);
      }
      if (info) {
        console.log("Password Reset mail send successfully");
      }
    }
  );
};

module.exports = { activationMailer, orderMailer, forgetPasswordMailer };
