const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Err = require("../utils/appError");
const sendMail = require("../utils/email");

// token oluşturan bir foksiyon
const signToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

// token oluşturup client'a gönderen fonksiyon
const createSendToken = (user, code, res) => {
  // token oluştur
  const token = signToken(user._id);

  // şifreyi clienta giden cevaptan kaldır
  user.password = undefined;

  // cevap olarak gönder
  res.status(code).json({
    message: "oturum açıldı",
    user,
    token,
  });
};

//* Kayol
exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // jwt tokeni oluştur ve gönder
    createSendToken(newUser, 201, res);
  } catch (error) {
    next(new Err(500, error.message));
  }
};

//* Giriş Yap
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1) email ve şifre geldi mi kontrol et
  if (!email || !password) {
    return next(new Err(400, "Lütfen mail ve şifrenizi giriniz"));
  }

  try {
    // 2) client'tan gelen emailde bir kullanıcı kayıtlı mı kontrol et
    const user = await User.findOne({ email });

    // 2.1) kayıtlı kullanıcı yoksa hata fırlat
    if (!user) {
      return next(new Err(404, "Girdiğiniz mail adresinde kayıtlı kullanıcı yoktur"));
    }

    // 3) client'tan gelen şifre veritbanındaki hashlenmiş şifre ile eşleşiyor mu kontrol et
    const isValid = await user.correctPass(password, user.password);

    // 3.1) eşleşmiyorsa hata fırlat
    if (!isValid) {
      return next(new Err(404, "Girdiğiniz mail adresinde kayıtlı kullanıcı yoktur"));
    }

    // 4) her şey tamam jwt tokeni oluşturup gönder
    createSendToken(user, 200, res);
  } catch (err) {
    next(new Err(500, "Giriş yaparken bir sorun oluştu"));
  }
};

exports.logout = async (req, res) => {};

//* Authorization Middleware
// 1) client'ın gönderdiği tokenin geçerliliğini doğrulayıp:
// - geçerli ise route'a erişime izin ver
// - geçerli değilse hata fırlat
exports.protect = async (req, res, next) => {
  // 1) Tokeni al ve tokenin tanımlı olduğunu kontrol et
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    // gelen metinden bearer kelimesini çıkart
    token = token.split(" ")[1];
  }

  // token tanımsız ise hata fırlat
  if (!token) {
    return next(new Err(403, "Bu işlem için yetkiniz yoktur.(jwt gönderilmedi)"));
  }

  // 2) Tokenin geçerliliğini kontrol et (zaman aşımına uğramışmı /imza doğrumu)
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.message === "jwt expired") {
      return next(new Err(403, "Oturmunuz süresi doldu. (Tekrar giriş yapın)"));
    }

    return next(new Err(403, "Gönderilen token geçersiz."));
  }

  // 3) JWT ile gelen kullanıcının hesabı duruyor mu kontrol et
  const activeUser = await User.findById(decoded.id);

  if (!activeUser) {
    return next(new Err(403, "Kullancının hesabına erişilemiyor"));
  }

  // 4) Tokeni verdikten sonra şifresini değiştirmiş mi kontrol et
  if (activeUser.passChangedAt && decoded.iat) {
    const changeTime = parseInt(activeUser.passChangedAt.getTime() / 1000);

    if (changeTime > decoded.iat)
      return next(
        new Err(403, "Yakın zamanda şifre değiştirdiniz. Lütfen tekrar giriş yapın")
      );
  }

  // bu mw'den sonra çalışıcak fonksiyonlarda isteği atan kullanıcı bilgilerine erişebilmek için req içersiinde kullanıcı verilerini ekle
  req.user = activeUser;
  next();
};

// 2) belirli roldeki kullanıcıların route'a erişimine izin verirken diğerlini engelleyen mw
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // 1) kulllancının rolü geçerli roller arasında yoksa erişimini engelle
    if (!roles.includes(req.user.role)) {
      return next(new Err(401, "Bu işlemi yapmak için yetkiniz yok (rol yetersiz)"));
    }

    // 2) kullanıcının rolü geçerli ise erişime izin ver
    next();
  };

// # Şifre Sıfırlama

// ## Kullanıcının şifresini unuttuysa

// a) Eposta adresine şifre sıfırlama bağlantısı gönder
exports.forgotPassword = async (req, res, next) => {
  //1) epostaya göre kullanıcı hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  //1.2) kullanıyı yoksa hata gönder
  if (!user) {
    return next(new Err(404, "Bu mail adresinde bir kullanıcı bulunamadı"));
  }

  //2) şifre sıfırlama tokeni oluştur
  const resetToken = user.createResetToken();

  //3) veritabanında tokenin hashlenmiş halini sakla
  await user.save({ validateBeforeSave: false });

  //4) kullanıcının maline tokeni link olarak gönder
  await sendMail();

  res.status(200).json("Veritbanıa şifrelenmiş token kaydedildi");
};

// b) yeni belirlenen şifreyi kaydet
exports.resetPassword = (req, res, next) => {
  //1) tokenden yola çıkarak kullanıcıyı bul
  //2) kullanıcı bulunudysa ve token geçerliyse yeni şifreyi belirle
  //3) token geçersiz veya süresi dolmuşsa hata gönder
  //4) kullanıcnın şifre değiştirme tarihini güncelle
};
