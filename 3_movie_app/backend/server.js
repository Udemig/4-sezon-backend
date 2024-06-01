const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");

// 1) server oluştur
const server = http.createServer((req, res) => {
  // istek atılan method türünü göre client'a cevap vericek fonksiyonu belirledik. fonksiyonları module yapısı sayesinde kod kalabılığı olmaması için ayrı dosyalarda tanımladık.
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;

    case "POST":
      postRequest(req, res);
      break;

    case "DELETE":
      deleteRequest(req, res);
      break;

    default:
      // cevab'ın durum kodunu belirle
      res.statusCode = 404;

      // gönderlicek cevaba içeirğin tipini headers olarak ekle
      res.setHeader("Content-Type", "application/json");

      // cevab'ın içeirğini belirleme
      res.write(
        JSON.stringify({
          message: "İstek yapılan adres tanımsız.",
        })
      );

      // client'a cevabı gönders
      res.end();
  }
});

// 2) belirli porta gelen istekleri dinle
const port = 5005;

server.listen(port, () => {
  console.log(`Server ${port} 'a gelen istekleri dinlemeye başladı.`);
});
