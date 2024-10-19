const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

// Client'ın istek atarken farklı domain adreslerine istek atmasının önüne geçmek adına PROXY kullanarak 8000.porta gelen istekleri path değerine bağlı olarak ilgili domain adreslerine yönlendiricez
app.use("/customer", proxy("http://localhost:8002"));
app.use("/shopping", proxy("http://localhost:8004"));
app.use("/", proxy("http://localhost:8003"));

app.listen(8000, () => {
  console.log("API Gateway 8000. portta çalışıyor");
});
