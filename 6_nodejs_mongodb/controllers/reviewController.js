const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");

exports.getAllReviews = factory.getAll(Review);

exports.setRefIds = (req, res, next) => {
  // eğerki atılan isteğin body bölümünde turun'id si ve user'id si varsa onu kullan ama yoksa o zaman isteğin req nesnesinde bulunan değerleri  kullan
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user._id;

  next();
};

exports.createReview = factory.createOne(Review);

exports.getReview = factory.getOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
