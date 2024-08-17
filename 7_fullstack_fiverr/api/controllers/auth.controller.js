import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

//* kaydol: yeni hesap oluştur
export const register = async (req, res, next) => {
  try {
    // şifreyi hashle ve saltla
    const hashedPass = bcrypt.hashSync(req.body.password, 12);

    // veritabanına kaydedilecek kullanıcıyı oluştur ve kaydet
    const newUser = await User.create({
      ...req.body,
      password: hashedPass,
    });

    // şifre alanını kaldır
    newUser.password = null;

    // client'a cevap gönder
    res.status(200).json({
      message: "Kullanıcı hesabı oluşturuldu",
      user: newUser,
    });
  } catch (err) {
    //client'a hata detaylarını gönder
    next(error(400, "Hesap oluşturulurken bir hata meydana geldi"));
  }
};

//* giriş yap: oturum aç
export const login = async (req, res, next) => {
  try {
    // 1) ismine göre kullanıcyı ara
    const user = await User.findOne({ username: req.body.username });

    // 2) kullanıcı bulunamazsa hata göndera
    if (!user) return next(error(404, "Giriş bilgileriniz yanlış"));

    // 3) kullanıcı bulunursa şifresi doğru mu kontrol et (veritabanındaki hashlenmiş şifre ile isteği body'sinden gelen normal şifreyi katşılaştır)
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // 4) şifre yanlışsa hata gönder
    if (!isCorrect) return next(error(404, "Giriş bilgileriniz yanlış"));

    // 5) şifre doğruysa jwt tokeni oluştur
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    // şifre alanını kaldır
    user.password = null;

    // 6) tokeni client'a gönder
    res.cookie("token", token).status(200).json({
      message: "Hesaba giriş yapıldı",
      user,
    });
  } catch (err) {
    next(error(400, "Giriş yaparken sorun oluştu"));
  }
};

//* çıkış yap: oturumu kapat
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Kullanıcı hesabından çıkış yapıldı",
  });
};
