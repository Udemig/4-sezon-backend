const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");

// 1) server oluştur
const server = http.createServer((req, res) => {
  console.log("😀😀 İSTEK GELDİ", req.method);

  // frontende gönderilecek bütün cevaplara eklenicek ve cors hatasını engelliyecek header
  res.setHeader("Access-Control-Allow-Origin", "*");

  // istek atılan method türünü göre client'a cevap vericek fonksiyonu belirledik. fonksiyonları module yapısı sayesinde kod kalabılığı olmaması için ayrı dosyalarda tanımladık.
  switch (req.method) {
    // frontend'den bir post/put/patch/delete isteği atılığı zaman tarayıcı öncelikle server'ın bu istek tiplerini kabul ettiğini kontrol etmek amacıyla options methoduyla istek atıyor. Eğer options isteği gelince cevap göndermezssek diğer isteği hiç atmıyor ama option gelince doğru header'lar ile cevap verirsek options'ın ardından asıl isteği gönderiyor

    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, PATCH, OPTIONS"
      );
      res.end();
      break;

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
