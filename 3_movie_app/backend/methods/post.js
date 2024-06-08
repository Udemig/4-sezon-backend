const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // isteğin body kısmına eriş
      const body = await bodyParser(req);

      // eksik içerik var mı kontrol et varsa hata yolla
      if (
        !body.title ||
        !body.year ||
        !body.rating ||
        !body.genre ||
        !body.genre.length > 0
      ) {
        res.writeHead(400);
        res.end("Lütfen bütün alanları tanımlayın");
        return;
      }

      // kaydedilecek filme id ekle
      body.id = crypto.randomUUID();

      // json dosyasında bütün verileri al (js formatında)
      let data = fs.readFileSync("./data/movies.json", "utf-8");
      data = JSON.parse(data);

      // mevcut filmlerin üzerine yeni filmi ekle
      data.movies.push(body);

      // json dosyasını güncelle
      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      // client'a cevap gönder
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(body));
    } catch (error) {
      return res.end("Hata Oluştu");
    }
  } else {
    res.end("Geçersiz yola istek attınız");
  }
};
