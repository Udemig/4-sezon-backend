const fs = require("fs");
/*
 * Eğerki client'tan gelen istek:
 * "/api/movies" > adresine gelirse bütün filmleri gönder
 * "/api/movies/1" > adresinse gelirse url'in sonundaki id'değerine göre filmi gönder

*/

module.exports = async (req, res) => {
  // yapılan isteğin temel adresi
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  // url'in sonundaki id değerini bir değişkene aktar
  const id = req.url.split("/")[3];

  if (req.url === "/api/movies") {
    //1) durum kodu belirle
    res.statusCode = 200;

    //2) headerları belirle
    res.setHeader("Content-Type", "application/json");

    //3) json dosyasından bütün filemleri al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    //4) client'a cevap gönder
    return res.end(movies);
  } else if (baseUrl === "/api/movies" && id) {
    //1) bütün filmleri al (javascript formatında)
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    //2) url'e eklenen id'ye karşılık gelen filmi dizide bul
    const movie = data.movies.find((movie) => movie.id === id);

    if (movie) {
      //3) eğerki film bulunursa client'a filmi gönder
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(JSON.stringify(movie));
    } else {
      //4) film bulunamazsa client'a hata gönder
      return res.end("geçersiz id");
    }
  } else {
    return res.end("yol bulunamadı");
  }
};
