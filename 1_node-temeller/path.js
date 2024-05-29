const path = require("path");

// Dosya Dizinindeki Değişkenkler
const text = "/data/content/deneme.js";

console.log("DIRNAME:  ", path.dirname(text));
console.log("BASENAME:  ", path.basename(text));
console.log("EXTNAME:  ", path.extname(text));

// Dosya Dizinindeki Fonksiyonlar

// join: iki veya daha fazla yolu birleştirmey yarar
const image = "profile.png";

const res = path.join("/", "media", "photos", image);

console.log(res); //  /media/photos/profile.png

// resolve: dosyanın mutlak konumunu verir
const abs = path.resolve("deneme.txt");

console.log(abs); // /Users/evin/Desktop/4-sezon-backend/1_node-temeller/deneme.txt

// normalize: . veya .. gibi relative konumu ifade eden yolu mutlak konuma çevirir
const corr = path.normalize("users/evin/..//deneme.txt");

console.log(corr); // users/deneme.txt
