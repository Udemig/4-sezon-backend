const mongoose = require("mongoose");
const { DB_URL } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("🎾 Veritabanına Bağlandı 🎾");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};
