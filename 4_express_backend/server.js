const express = require("express");
const {
  createCar,
  getAllCars,
  updateCar,
  deleteCar,
  getCar,
} = require("./contollers/carControllers");
const logger = require("./middleware/logger");
const control = require("./middleware/control");

// kurulum
const app = express();
const PORT = 3000;

// Middleware (Arayazılım)
// İsteğin gelmesiyle cevabın gönderilmesi arasında çlışan fonksiyonlara denir.
app.use(logger);

// isteklerin body bölümünde gönderile json verilerini işler
app.use(express.json());

// route/endpoint tanımlama
app.route(`/api/v1/cars`).get(getAllCars).post(createCar);

app
  .route(`/api/v1/cars/:id`)
  .get(control, getCar)
  .patch(control, updateCar)
  .delete(control, deleteCar);

// dinlenicek portu belirle
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
