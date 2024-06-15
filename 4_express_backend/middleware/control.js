const fs = require("fs");

// araba verilerini al
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

module.exports = (req, res, next) => {
  // isteğe parametre olarak eklenen id'de bri araba var mı kontrol et
  const found = cars.find((car) => car.id === req.params.id);

  // eleman bulunamadıysa hata gönder
  if (!found) {
    return res
      .status(404)
      .json({ message: "Gönderilen id'ye sahip bir araç bulunamadı" });
  }

  // bir sonraki çalışıcak olan contoller fonksiyonda bulunana araba veirlerine erişilebilmesi için request nesnesi içerisnde bu veriyi kaydet
  req.car = found;

  // eleman bulunduysa sonraki adıma geç
  next();
};
