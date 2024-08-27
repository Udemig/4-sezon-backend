import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Client tarafından çerezler / header ile göndeirlen jwt tokeninin geçerliliğini kontrol edicez ve eğer geçersizse hata göndericek geçerliyse kullanıcı bilgilerini req nesnesi içersine kaydet

const protect = (req, res, next) => {
  //1) çerezler / headers ile gelen tokene eriş
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //2) token yoksa hata ver
  if (!token) return next(error(423, "Yetkiniz yok (Token bulunamadı)"));

  //3) token geçerli mi kontrol
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    //4) token geçersizse hata gönder
    if (err)
      return next(error(423, "Tokeniniz geçersiz veya süresi dolmuş"));

    //5) geçerliyse req nesnesi içerisini kullanıcı bilgilerini ekle
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  //6) sonraki adıma devam et
  next();
};

export default protect;
