// API'a gelen tur ile alakalı http isteklerine cevap gönderen bütün fonksiyonlar bu dosyada yer alıcak
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const Err = require("../utils/appError");
const c = require("../utils/catchAsync");

// zorluğa göre istatistikleri hesapla
exports.getTourStats = c(async (req, res, next) => {
  // Aggregation Pipeline
  // Raporlama Adımları
  const stats = await Tour.aggregate([
    // 1.Adım ) ratingi 4 ve üzeri olan turları al
    {
      $match: { ratingsAverage: { $gte: 4.0 } },
    },
    // 2.Adım ) zorluklarına göre gruplandır ve ortalam değerlerini hesapla
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    // 3.Adım ) gruplanan veriyi fiyata göre artan sırala
    { $sort: { avgPrice: 1 } },
    // 4.Adım ) fiyatı 400den küçük olan zorlukları kaldır
    { $match: { avgPrice: { $gte: 500 } } },
  ]);

  res.status(200).json({
    message: "Rapor oluşturuldu",
    stats,
  });
});

// yıla göre istastikleri hesapla
exports.getMonthlyPlan = c(async (req, res, next) => {
  // parametre olarak gelen yılı al
  const year = Number(req.params.year);

  // raporlama adımları
  const stats = await Tour.aggregate([
    {
      $unwind: {
        path: "$startDates",
      },
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: "$startDates",
        },
        count: {
          $sum: 1,
        },
        tours: {
          $push: "$name",
        },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  res.status(200).json({
    message: `${year} yılı için aylık plan oluşturuldu`,
    stats,
  });
});

// günün fırsatları için gerekli filtremeleri ayarlar
exports.aliasTopTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  req.query["price[lte]"] = 1200;
  req.query.limit = 5;

  next();
};

// bütün turları alır
exports.getAllTours = c(async (req, res, next) => {
  // 1) API Features class'ından örnek al (geriye sorguyu oluşturup döndürür)
  const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
    .filter()
    .sort()
    .limit()
    .pagination();

  // 2) sorguyu çalıştır
  const tours = await features.query;

  res.status(200).json({
    message: "Bütün turlar alındı",
    results: tours.length,
    tours,
  });
});

// yeni bir tur oluşturur
exports.createTour = c(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({ message: "Yeni Tur Oluşturuldu", tour: newTour });
});

// id'sine göre bir tur alır
exports.getTour = c(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({ message: "1 Tur Alındı", tour });
});

// id'sine göre bir turu günceller
exports.updateTour = c(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // güncelenmiş dökümanı döndürür
  });

  res.status(200).json({ message: "Tur Güncellendi", tour: updatedTour });
});

// id'sine göre bir turu siler
exports.deleteTour = c(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);

  res.status(204).json({ message: "Tur Silindi" });
});
