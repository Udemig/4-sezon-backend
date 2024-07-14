// API'a gelen tur ile alakalı http isteklerine cevap gönderen bütün fonksiyonlar bu dosyada yer alıcak
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

// zorluğa göre istatistikleri hesapla
exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Sorun oluştu",
      error: err.message,
    });
  }
};

// yıla göre istastikleri hesapla
exports.getMonthlyPlan = async (req, res) => {
  // parametre olarak gelen yılı al
  const year = Number(req.params.year);

  try {
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
  } catch (error) {
    console.log(error);
  }
};

// günün fırsatları için gerekli filtremeleri ayarlar
exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  req.query["price[lte]"] = 1200;
  req.query.limit = 5;

  next();
};

// bütün turları alır
exports.getAllTours = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// yeni bir tur oluşturur
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ message: "Yeni Tur Oluşturuldu", tour: newTour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// id'sine göre bir tur alır
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({ message: "1 Tur Alındı", tour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// id'sine göre bir turu günceller
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // güncelenmiş dökümanı döndürür
    });

    res.status(200).json({ message: "Tur Güncellendi", tour: updatedTour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// id'sine göre bir turu siler
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Tur Silindi" });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};
