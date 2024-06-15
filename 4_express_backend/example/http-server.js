const http = require("http");

// bir http sunucusu oluştur ve gelen isteklere cevap gönder
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // durum kodu ve headerı belirle
    res.writeHead(200, { "Content-Type": "application/json" });

    //cevap gönder
    res.end(JSON.stringify({ message: "Serverdan Merhabalar" }));
  }

  if (req.url === "/new" && req.method === "POST") {
    res.writeHead(201, { "Content-Type": "application/json" });

    res.end(JSON.stringify({ message: "Eleman Oluşturuldu" }));
  }
});

// port 3001 üzerinde çalış
server.listen(3001, "127.0.0.1", () => {
  console.log("server 3001. portu dinlemeye başladı");
});
