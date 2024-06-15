const fs = require("fs");
const crypto = require("crypto");
const write = require("../utils/write");

// araba verilerini al
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

// Bütün arabaları alan
exports.getAllCars = (req, res) => {
  res.status(200).json({
    message: "Arabalar Alındı",
    results: cars.length,
    cars,
  });
};

// Yeni araç ekleyen
exports.createCar = (req, res) => {
  // araç veirsine id ekle
  const newCar = { ...req.body, id: crypto.randomUUID() };

  // diziye ekle
  cars.push(newCar);

  // json dosyasını güncelle
  write(cars);

  res.status(200).json({
    message: "Araba Oluşturuldu",
    car: newCar,
  });
};

// Id'sine göre araç alan
exports.getCar = (req, res) => {
  res.status(200).json({
    message: "Araba alındı",
    car: req.car,
  });
};

// Id'sine göre araç silen
exports.deleteCar = (req, res) => {
  // id'si gelen aracı diziden kaldır
  cars = cars.filter((car) => car.id !== req.params.id);

  //json dosyasını güncelle
  write(cars);

  res.status(204).json({
    message: "Araba silindi",
  });
};

// Id'sine göre araç güncelleyen
exports.updateCar = (req, res) => {
  // isteğin body kısmındaki güncellenicek değerleri al
  const updatedData = req.body;

  // aracın güncel değerlerine sahip yeni bir nesne oluştur
  const updatedCar = { ...req.car, ...updatedData };

  // güncellenicek elemanın dizideki sırasını bul
  const index = cars.findIndex((car) => car.id === req.params.id);

  // dizideki eski aracın yerine yeni aracı koy
  cars.splice(index, 1, updatedCar);

  // json dosyasını güncelle
  write(cars);

  // clienta cevap gönder
  res.status(200).json({
    message: "Araba Güncellendi",
    car: updatedCar,
  });
};
