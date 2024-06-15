module.exports = (req, res, next) => {
  console.log("💥İSTEK GELDİ💥", "Method: " + req.method + " Url: " + req.url);

  // arayazılımdan sonra çalışıcak olan fonksiyonla devam et
  next();
};
