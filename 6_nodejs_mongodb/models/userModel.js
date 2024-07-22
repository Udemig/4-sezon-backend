const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// kullanıcı şeması
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır"],
  },

  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalıdır"],
    unique: [true, "Bu eposta adresine ait kayıtlı bir hesap bulunmaktadır"],
    validate: [validator.isEmail, "Lütfen geçerli bir email giriniz"],
  },

  photo: {
    type: String,
    default: "defaultpic.webp",
  },

  password: {
    type: String, //
    required: [true, "Kullanıcı şifre değerine sahip olmalıdır"],
    minLength: [8, "Şifre en az 8 karakter içermeli"],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
  },

  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayın"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
  },

  passChangedAt: Date,

  passResetToken: String,

  passResetExpires: Date,
});

// 1) Veritabanına kullanıcıyı kaydetmeden önce:
// *  password alanını şifreleme algoritmalarından geçir.
// *  passwordConfirm alanını kaldır
userSchema.pre("save", async function (next) {
  // daha önce parola hashlendiyse aşağıdaki adımları atla
  if (!this.isModified("password") || this.isNew) return next();

  // şifreyi hashle ve saltla
  this.password = await bcrypt.hash(this.password, 12);

  // onay şifreisni kaldır
  this.passwordConfirm = undefined;
});

// 2) Sadece model üzerinden erişlebilen fonksiyon:
// * normal şifre ile hashlenmiş şifreyi karşılaştırır
userSchema.methods.correctPass = async function (candidatePass, userPass) {
  // ADAY ŞİFRE > Denem@123
  // VERİTABANINDA SAKLANAN ŞİFRE > $2b$12$guv8tbGfqxoi5vGhG2DYOu7Qm6DzzZjRpeLFAK2gTrik0aonXQy/i
  return await bcrypt.compare(candidatePass, userPass);
};

// 3) şifre sıfırlama tokeni oluşturan fonksiyon:
// * bu token daha sonra kullancının maline gönderilicek ve kullanıcı şifreisni sıfırlarken kimliğini doğrulama amaçlı bu tokeni kullanıcaz
// * 10 dakikalik bir geçerlilik süresi olucak
userSchema.methods.createResetToken = async function () {
  // 1) 32 byte'lık rastgele bir veri oluşturur ve bunu hexadecimal bir diziye dönüştürür
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2) tokeni hashle ve veritabanına kaydet
  this.passResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 3) tokenin son geçerlilik tarihini kullanıcı dökümanına ekle
  this.passResetExpires = Date.now() + 10 * 60 * 1000;

  // 4) tekenin normal halini return et
  return resetToken;
};

//kullanıcı modeli
const User = model("User", userSchema);
module.exports = User;
