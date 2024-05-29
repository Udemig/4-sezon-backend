// file sysytem özelliklerini kullanbilmek için bu dosyaya import ettik ve bir değişkene aktardık

const fs = require("fs");

// Dosya istatiklerini okuma
// Senkron > Blocking
const static = fs.statSync("./data/deneme.txt");

console.log("Sonuç 💥💥");

console.log("sonuçtan sonra");

// Asenkron
fs.stat("./data/deneme.txt", (err, data) => {
  if (err) return console.log("HATA", err);

  console.log("İstatikler 💥💥");
});

console.log("merhaba");
