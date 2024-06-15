const express = require("express");

// bir api oluştur
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Serverdan Merhabalar" });
});

app.post("/new", (req, res) => {
  res.status(201).json({ message: "Ürün oluşturuldu" });
});

// hangi portta çalışıcağını belirler
app.listen(port, () => {
  console.log("Server 3000. portu dinliyor");
});
