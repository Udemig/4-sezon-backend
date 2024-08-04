// Geliştirme aşamasında mongodbdeki veirleirn bozulması sıkça karşılaştığımız bür durum ve bu durumda databasdeki veirleri silip json dosyasındaki verileri tekrardan aktarmamız gerekicek bunu arayüzden yapmak uğraştıcı olucağı için 2 fonksiyon hazırlıyıcaz
const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");
const User = require("../../models/userModel");

// dotenv kütüphaneisni çevre değişkenlere eirşmek için kuruyoruz
require("dotenv").config();

// mongodb veritabanına bağlan
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("🥳 VeriTabanı ile bağlantı kuruldu 🥳"))
  .catch((err) =>
    console.log("😡 VeriTabanına bağlanırken hata oluştu 😡", err)
  );

// json dosyasından verileri al
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

// devdata klasöründeki json dosylarından veirleri alıp mongodbye aktar
const importData = async () => {
  try {
    await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    console.log("Json verileri kolleksiyona aktarıldı");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// mongodbdeki datları silicek
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    console.log("Bütün veriler temizlendi");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// komutun sonuna eklenen argümana göre çalışıcak fonksiyonu belirliyoruz
if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--delete")) {
  deleteData();
}
