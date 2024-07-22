const nodemailer = require("nodemailer");

const sendMail = async () => {
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
    to: "mahmut@gmail.com",
    subject: "Şifre Sıfırlama Epostası",
    text: "Merhaba bu bağlanıtyı kullanarak şifrenizi .....",
  };

  // 3) Email'i gönder
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
