import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import gigRouter from "./routes/gig.routes.js";
import cookieParser from "cookie-parser";

// env dosyasındaki verilere erişmek için kurulum
dotenv.config();

// veritbanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("⚾️ Veritabanı ile bağlantı kuruldu"))
  .catch((err) => console.log("🏀Veritabanına bağlanamadık", err));

// express uygulaması oluştur
const app = express();

//* middlewares
//a) body/query alanlarındaki  json içeriğinin işlenmesi sağlar
app.use(express.json());

//b) CORS hatalarının önüne geçmek için header'lar ekler
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

//c) konsola istek bilgilerini yazan mw
app.use(morgan("dev"));

//d) istekle birlikte gelen çersezleri işler
app.use(cookieParser());

// kontrol route'u
app.route("/health").get((req, res) => {
  res.json("Server çalışıyor.....");
});

// route'ları tanımla
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);

// hata yönetimi için mw
// controller'lardan yapılac tüm yönlendirmelerde bu mw çalışıcak
app.use((err, req, res, next) => {
  console.log("😡😡 HATA MEYDANA GELDİ 😡😡");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz bir şeyler ter gitti";

  return res.status(errStatus).json({
    message: errMessage,
  });
});

// hangi portun dinleneceğini belirleyelim
app.listen(process.env.PORT, () => {
  console.log(`🎾 API ${process.env.PORT} portunu dinlemeye başladı`);
});
