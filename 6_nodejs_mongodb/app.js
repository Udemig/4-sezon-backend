const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const app = express();

// gelen istekleri loglar
app.use(morgan("dev"));

// helmet: güvenlik için headerlar ekle
app.use(helmet());

// rate limit: aynı ip adresinden belirli bir süre içerisnde gelebilcek istek sınırını belirleme
const limiter = rateLimit({
  max: 10, // aynı ip adresinden gelicek mak istek hakkı
  windowMs: 15 * 60 * 1000, // ms cinsinden 15 dakika
  message:
    "15 dakika içerisindek istek hakkınızı doldurdunuz. Daha sonra tekrar deneyiniz",
  legacyHeaders: false,
});

app.use("/api", limiter);

// gelen isteklerin body'sini işle (json > js)
app.use(express.json({ limit: "10kb" }));

// gelene çerezleri işle
app.use(cookieParser());

// mongoSanitize: kullanıcı giridilerinde (body/params/headers/query) js kodu tespit ettiği zaman bozar.
app.use(sanitize());

// hpp: parametre kirlilğini önler
app.use(hpp());

// turlar ile alakalı yolları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// tanımlanmayan bir route'a istek atıldığında hata ver
app.all("*", (req, res, next) => {
  // hata detaylarını belirle
  const err = new AppError(404, "İstek attığınuz yol bulunamadı");

  // hata middleware'ine yönlendir
  next(err);
});

// hata olduğunda devreye giren middleware
app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Üzgünüz bir hata meydana geldi";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
