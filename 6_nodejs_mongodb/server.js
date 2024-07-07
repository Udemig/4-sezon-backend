const app = require("./app");
const mongoose = require("mongoose");

// dotenv kütüphaneisni çevre değişkenlere eirşmek için kuruyoruz
require("dotenv").config();

// mongodb veritabanına bağlan
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🥳 VeriTabanı ile bağlantı kuruldu 🥳"))
  .catch((err) =>
    console.log("😡 VeriTabanına bağlanırken hata oluştu 😡", err)
  );

// express uygulmasını ayağa kaldır
app.listen(process.env.PORT, () => {
  console.log(`😎 Server ${process.env.PORT} portunda çalışmaya başladı`);
});
