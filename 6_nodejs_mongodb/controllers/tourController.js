// API'a gelen tur ile alakalı http isteklerine cevap gönderen bütün fonksiyonlar bu dosyada yer alıcak
const Tour = require("../models/tourModel");

// bütün turları alır
exports.getAllTours = async (req, res) => {
  try {
    // 1) turlar için sorgu oluştur (filtreleme ile)
    const tourQuery = Tour.find(req.formattedQuery);

    // 2) eğer sort parametresi varsa ona göre sırala yoksa en yeniyi en başa koy
    if (req.query.sort) {
      // mongodb sırlanıcak fieldların arasına "," değil " " istediği için güncelledik
      tourQuery.sort(req.query.sort.split(",").join(" "));
    } else {
      tourQuery.sort("-createdAt");
    }

    // 3) eğer fields parametresi varsa alan limitle
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      tourQuery.select(fields);
    }

    // 4) pagination | sayfalama
    const page = Number(req.query.page) || 1; // mevcut sayfa sayısı
    const limit = Number(req.query.limit) || 10; // sayfa başına eleman sayısı
    const skip = (page - 1) * limit; // limit çalışmadan önce atlanıcak eleman sayısı

    tourQuery.skip(skip).limit(limit);

    // 5) sorguyu çalıştır
    const tours = await tourQuery;

    res.status(200).json({
      message: "Bütün turlar alındı",
      page,
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
