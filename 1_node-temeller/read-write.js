const fs = require("fs");

// File System

// Dosya sistemi ve nodejs bulunan diğer nesnlerdeki methodlarının çoğunun hem asenlron hemde senkron çalışan verisyonları bulunur

// Senkron > Blocking
// Senkron işlemler sırayla gerçeklerşi
// Senkron işlemleri bir işlem başlaması için önceki işlemin bitmesini bekler
// bu nedeneler tek bir işlem için uzun süre bekledipimiz durumda tüm uygulama durabilir
// Dosya okuma/yazma veritabanı sorguları gibi sesnkron işlemerl uygulumadki diğer bütün hizmetlerin bloke olmasına sebep olabilir

// a) Senkron Dosya okuma
const text = fs.readFileSync("./data/input.txt", "utf-8");

console.log(text);

// b) Senkron Dosya Yazma
const newText = `Node.js'i yeni öğreniyorum ve read dile ile öğrendiklerim bunlar. \n ${text}. \n Oluşturulma Tarihi: ${Date.now()}`;

fs.writeFileSync("./data/output.txt", newText);
console.log("Dosya başarıyla oluşturuldu");

// Asenkron > NonBlocking
// Asenkron şekilde çalışan fonksiyonlar bizden genelde 2. parametre olarak bir callback function ister fonksiyon çalışmaya başladıktan sonra devamında kodları çalışmasını engellemez ve işini bitirdiğinde bizim veridğimiz cb. function'ı tetikler ve hata veya cevap döndürür
fs.readFile("./data/start.txt", "utf-8", (err, data) => {
  if (err) return console.log("Üzgünüz okurken hata oluştu");

  fs.writeFile("./data/final.js", data, (err) => {
    if (err) return console.log("Üzgünüz yzaarken hata oluştu");

    console.log(
      "Final dosyası başarıyla oluşturuldu ve start dosyasındaki metin aktarıldı"
    );
  });
});

// SORU:
// 1) start dosyasını okuyun
// 2) start dosyanın içerindeki yolda belirtilen dosya okunsun
// 3) bir final dosyası oluşturun ve önceki adımda elde ettiğiniz yazıyı aktarın

fs.readFile("./quiz/start.txt", "utf-8", (err, fileName) => {
  if (err) return console.log("Dosya ismi alınamadı");

  fs.readFile(fileName, "utf-8", (err, text) => {
    if (err) return "Belitilen dosya okunamadı";

    fs.writeFileSync("./quiz/final.js", text);
  });
});
