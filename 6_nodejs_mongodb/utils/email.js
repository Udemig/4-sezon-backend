const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  // 1) Transporter - Taşıyıcı Oluştur
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 2) Email'in içeriğini tanımla
  const mailOptions = {
    from: "Furkan Evin <furkanevin00@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // 3) Email'i gönder
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
