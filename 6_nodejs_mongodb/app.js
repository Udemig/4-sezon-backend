const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoute");
const morgan = require("morgan");
const AppError = require("./utils/appError");

const app = express();

// gelen istekleri loglar
app.use(morgan("dev"));

// gelen isteklerin body'sini işle
app.use(express.json());

// turlar ile alakalı yolları projey tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);

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
