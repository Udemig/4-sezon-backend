// Javascript'deki yerleşik Error class'ının bütün özleliklerini alıp üzeirne ekstra olarak yeni özelliklere sahip bir gelişmiş hata class'ı oluşturalım

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    // durum koduna göre status değerini belirle: "4xx" şeklindeyse "fail" , "5xx" şeklindeyse "error" olmalı
    this.status = this.statusCode > 500 ? "error" : "fail";

    // hatanın detayı ve hata oluşana kadar çalışan dosyların bilgisini
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
