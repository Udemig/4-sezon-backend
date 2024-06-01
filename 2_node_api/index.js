// http modülünü çağırdık
const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate.js");

// API: Gelen istekleri izler ve Cevap Gönderir

/*
 * createServer methoduna verdiğimzi dinleyici fonksiyon her api isteği alındığında tetiklenir.

 * Bu fonksiyon 2 parametre alır
 * 1) request > istek ile alakalı veriler
 * 2) response > gönderilecek cevap
 
 * Bu fonksiyon içerisind eher gelen isteği dinleyip bir cevap göndericez 
*/

/*
 * Routing
 * API'a gelen isteğin hangi endpoint (uç nokta) 'e geldiğini tespit edip ona göre cevap gönderme işlemine routing denir.
 * Routing içiçn client'ın hangi yola ve hangi http method ile istek attığını bilmemiz gerekiyor
 */

// anasayfa için html dosyanın içeirğini oku
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");

// detay sayfası içiçn html dosyasını oku
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");

// card htmlini oku
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

// ürün verilerini oku (json formatında alır)
const data = fs.readFileSync("./dev-data/data.json", "utf-8");

// json formatındaki veriyi js formatına çevir
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // url i parçalara ayır
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    case "/overview":
      // meyveler verisini dön dizideki eleman sayısı kadar kart oluştur
      const cards = dataObj.map((el) => replaceTemplate(tempCard, el));

      // anasayfadaki {%PRODUCT_CARDS%} ifadesinin olduğu yere kartları gönder
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);

      return res.end(tempOverview);

    case "/product":
      // urldeki id'li ürünü dizide bul
      const product = dataObj[query.id];

      // detay sayfasının html'ini ürünün bilgilerine göre düzenle
      const output = replaceTemplate(tempProduct, product);

      // client'a html'i gönder
      return res.end(output);

    default:
      return res.end("<h1>ARANAN SAYFA BULUNAMADI</h1>");
  }
});

// Bir dinleyici oluşturup hangi adrese gelen istekleri dinleyicğimiz söylemeliyiz
server.listen(4000, "127.0.0.1", () => {
  console.log("Server 4000 porta gelen istekleri dinlemeye başladı");
});
