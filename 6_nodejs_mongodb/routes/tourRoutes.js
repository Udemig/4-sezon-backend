// Turlar ile alakalı API'da tanımlanıcak bütün endpoint / route'ları bu dosyada tanımlanır

const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const formatQuery = require("../middleware/formatQuery");

const router = express.Router();

// ------- yollar ------------

// client zaten /api/tours'a doğru parametrelerle istek atarsa aynı sonucu alıcak ama param sayısı fazla olduğundan bazı durumlarda parametrleri client'tan istemek yerine önden bizim belirledğimiz route'lar oluşturmak client'ın işiini kolaylaştırır
router.route("/top-tours").get(aliasTopTours, getAllTours);

// turların istatistiklerinin alınması için route
// gerçek seneryo: admin paneli için zorluğa göre turların istatisklerini hesapla
router.route("/tour-stats").get(getTourStats);

// gerçek seneryo: admin paneli için parametre olarak gelen yılın he rayında kaç tur başlayacak hesapla.
router.route("/monthly-plan/:year").get(getMonthlyPlan);

router
  .route("/")
  .get(formatQuery, getAllTours) // getAllTours çalışmadan önce formatQuery mw'i devreye girer
  .post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
