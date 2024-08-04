const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Err = require("../utils/appError");
const sendMail = require("../utils/email");
const crypto = require("crypto");
const c = require("../utils/catchAsync");

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

  // tokeni sadece http üzeirnden sseyahat eden çerezler ile gönder
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure:true
  });

  // şifreyi clienta giden cevaptan kaldır
  user.password = undefined;

  // cevap olarak gönder
  res.status(code).json({
    message: "oturum açıldı",
    user,
  });
};

//* Kayol
exports.signUp = c(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // jwt tokeni oluştur ve gönder
  createSendToken(newUser, 201, res);
});

//* Giriş Yap
exports.login = c(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) email ve şifre geldi mi kontrol et
  if (!email || !password) {
    return next(new Err(400, "Lütfen mail ve şifrenizi giriniz"));
  }

  // 2) client'tan gelen emailde bir kullanıcı kayıtlı mı kontrol et
  const user = await User.findOne({ email });

  // 2.1) kayıtlı kullanıcı yoksa hata fırlat
  if (!user) {
    return next(
      new Err(404, "Girdiğiniz mail adresinde kayıtlı kullanıcı yoktur")
    );
  }

  // 3) client'tan gelen şifre veritbanındaki hashlenmiş şifre ile eşleşiyor mu kontrol et
  const isValid = await user.correctPass(password, user.password);

  // 3.1) eşleşmiyorsa hata fırlat
  if (!isValid) {
    return next(new Err(404, "Girdiğiniz şifre geçersizdir"));
  }

  // 4) her şey tamam jwt tokeni oluşturup gönder
  createSendToken(user, 200, res);
});

exports.logout = async (req, res) => {};

//* Authorization Middleware
// 1) client'ın gönderdiği tokenin geçerliliğini doğrulayıp:
// - geçerli ise route'a erişime izin ver
// - geçerli değilse hata fırlat
exports.protect = c(async (req, res, next) => {
  // 1) Tokeni al ve tokenin tanımlı olduğunu kontrol et
  let token = req.cookies.jwt || req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    // gelen metinden bearer kelimesini çıkart
    token = token.split(" ")[1];
  }

  // token tanımsız ise hata fırlat
  if (!token) {
    return next(
      new Err(403, "Bu işlem için yetkiniz yoktur.(jwt gönderilmedi)")
    );
  }

  // 2) Tokenin geçerliliğini kontrol et (zaman aşımına uğramışmı /imza doğrumu)
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.message === "jwt expired") {
      return next(
        new Err(403, "Oturmunuz süresi doldu. (Tekrar giriş yapın)")
      );
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
        new Err(
          403,
          "Yakın zamanda şifre değiştirdiniz. Lütfen tekrar giriş yapın"
        )
      );
  }

  // bu mw'den sonra çalışıcak fonksiyonlarda isteği atan kullanıcı bilgilerine erişebilmek için req içersiinde kullanıcı verilerini ekle
  req.user = activeUser;
  next();
});

// 2) belirli roldeki kullanıcıların route'a erişimine izin verirken diğerlini engelleyen mw
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // 1) kulllancının rolü geçerli roller arasında yoksa erişimini engelle
    if (!roles.includes(req.user.role)) {
      return next(
        new Err(401, "Bu işlemi yapmak için yetkiniz yok (rol yetersiz)")
      );
    }

    // 2) kullanıcının rolü geçerli ise erişime izin ver
    next();
  };

// # Şifre Sıfırlama
// - Kullanıcının şifresini unuttuysa

// a) Eposta adresine şifre sıfırlama bağlantısı gönder
exports.forgotPassword = c(async (req, res, next) => {
  //1) epostaya göre kullanıcı hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  //1.2) kullanıyı yoksa hata gönder
  if (!user) {
    return next(
      new Err(404, "Bu mail adresinde bir kullanıcı bulunamadı")
    );
  }

  //2) şifre sıfırlama tokeni oluştur
  const resetToken = user.createResetToken();

  //3) veritabanında tokenin hashlenmiş halini sakla
  await user.save({ validateBeforeSave: false });

  //4) kullanıcının maline tokeni link olarak gönder
  const url = `${req.protocol}://${req.headers.host}/api/users/reset-password/${resetToken}`;

  await sendMail({
    email: user.email,
    subject: "Şifre Sıfırlama Bağlantısı (10 dakika)",
    text: resetToken,
    html: `
    <h2>Merahaba ${user.name}</h2>
    <p><b>${user.email}</b> eposta adresine bağlı tourify hesabı için şifre sıfırlama bağlanıtısı aşağıdadır</p>
    <a href=${url}>${url}</a>
    <p>Yeni şifre ile birlikte yukarıdaki bağlantıya <i>PATCH</i> isteği atın.</p>
    <p><b><i>Tourify Ekibi</i></b></p>
    `,
  });

  res.status(200).json("Veritbanıa şifrelenmiş token kaydedildi");
});

// b) yeni belirlenen şifreyi kaydet
exports.resetPassword = c(async (req, res, next) => {
  try {
    //1) tokenden yola çıkarak kullanıcıyı bul
    const token = req.params.token;

    //2) elimizde normal token olduğu ve veritbanında hashlenmiş hali saklandığı için bunları karşılaştırabilmek adına parametreyle gelen tokeni hashleyip veritbanındakiyle aynı mı kontrolü yap
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    //3) hashlenmiş tokene sahip kullanıcıyı al
    //3.1) son geçerlilik tarihi henüz dolmamış olmasını kontrol et
    const user = await User.findOne({
      passResetToken: hashedToken,
      passResetExpires: { $gt: Date.now() },
    });

    //4) token geçersiz veya süresi dolmuşsa hata gönder
    if (!user) {
      return next(new Err(423, "Tokenin süresi dolmuş veya geçersiz"));
    }

    //5) kullanıcnın bilgilerini güncelle
    user.password = req.body.newPass;
    user.passwordConfirm = req.body.newPass;
    user.passResetToken = undefined;
    user.passResetExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Şifreniz başarıyla güncellendi",
    });
  } catch (error) {
    next(error);
  }
});

// # Şifre Güncelleme
// - Kullanıcı şifresini hatırlıyor ama değiştirmek istiyorsa
exports.updatePassword = c(async (req, res, next) => {
  // 1) Kullanıcının bilgilerini al
  const user = await User.findById(req.user.id);

  // 2) Gelen mevcut şifre doğru mu kontrol et
  if (!(await user.correctPass(req.body.currentPass, user.password))) {
    return next(new Err(400, "Girdiğiniz mevcut şifre hatalı"));
  }

  // 3) Doğruysa yeni şifre ile güncelle
  user.password = req.body.newPass;
  user.passwordConfirm = req.body.newPass;

  await user.save();

  // 4) (Opsiyonel) Tekrar giriş yapmaması için token oluşturup gönder
  createSendToken(user, 200, res);
});
