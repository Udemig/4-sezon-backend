// Turlar ile alakalı API'da tanımlanıcak bütün endpoint / route'ları bu dosyada tanımlanır

const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");
const formatQuery = require("../middleware/formatQuery");

const router = express.Router();

// ------- yollar ------------

router
  .route("/api/tours")
  .get(formatQuery, getAllTours) // getAllTours çalışmadan önce formatQuery mw'i devreye girer
  .post(createTour);

router
  .route("/api/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
