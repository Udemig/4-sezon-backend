const Review = require("../models/reviewModel");
const c = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllReviews = c(async (req, res, next) => {
  //* /reviews > bütün turlara ait yorumları getir
  //* /tours/turID/reviews > bir tura ait yorumları getir

  // boş bir filtre nesnesi oluştur
  let filters = {};

  // url'de tur id'si varsa filtrelere onu ekle (bu sayede sadece bir tura ait yorumlar alınır)
  if (req.params.tourID) filters = { tour: req.params.tourID };

  const reviews = await Review.find(filters);

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

// TODO factory methodunu entegre et
exports.createReview = c(async (req, res, next) => {
  // eğerki atılan isteğin body bölümünde turun'id si ve user'id si varsa onu kullan ama yoksa o zaman isteğin req nesnesinde bulunan değerleri  kullan
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user._id;

  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: newReview,
  });
});

exports.getReview = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "istek başarılı",
  });
};

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
