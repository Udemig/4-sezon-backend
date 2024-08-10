const APIFeatures = require("../utils/apiFeatures");
const c = require("../utils/catchAsync");

// Dışarıdan aldığı modele göre silme işlemi yapan bir fonksiyon yazdık
// Delete işlemini proje içerisinde sadece model ismini değiştiriirek defalarce kullanıp gereksiz kod tekrarına sebep oluyorduk bizde bu kod tekrarını önlemek için bir fonksiyon yazdık bu fonksiyon delete işlemini yapılcağı model'i parametre olarak alıp işlemi gerçekleştiriyor.
exports.deleteOne = (Model) =>
  c(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({ message: "Döküman başarıyla silindi" });
  });

// Belirlediğimiz standarta göre dışarıdan aldığı Modeldeki dökümanı güncelleyen method
exports.updateOne = (Model) =>
  c(async (req, res) => {
    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // güncelenmiş dökümanı döndürür
      }
    );

    res
      .status(200)
      .json({ message: "Belge Başarıyla Güncellendi", data: updatedDoc });
  });

// Oluşturma işlemleri içi ortak kullanılabilecek method
exports.createOne = (Model) =>
  c(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res
      .status(201)
      .json({ message: "Yeni Belge Oluşturuldu", data: newDoc });
  });

// Sadece bir döküman almak için kullanılacak method
exports.getOne = (Model, popOptions) =>
  c(async (req, res, next) => {
    // bir sorgu oluştur
    let query = Model.findById(req.params.id);

    // eğer populate parametresi varsa sorguya ekle
    if (popOptions) query = query.populate(popOptions);

    // sorguyu çalıştır
    const doc = await query;

    // cevap gönder
    res.status(200).json({ message: "Belge Alındı", data: doc });
  });

// Bütün verileri almak için kullanılcak method (filter-sort-paginate destekler)
exports.getAll = (Model) =>
  c(async (req, res, next) => {
    //* /reviews > bütün turlara ait yorumları getir
    //* /tours/turID/reviews > bir tura ait yorumları getir

    // url'de tur id'si varsa filtrelere onu ekle (bu sayede sadece bir tura ait yorumlar alınır)
    if (req.params.tourID) req.formattedQuery.tour = req.params.tourID;

    // 1) API Features class'ından örnek al (geriye sorguyu oluşturup döndürür)
    const features = new APIFeatures(
      Model.find(),
      req.query,
      req.formattedQuery
    )
      .filter()
      .sort()
      .limit()
      .pagination();

    // 2) sorguyu çalıştır
    const docs = await features.query;

    res.status(200).json({
      message: "Bütün veriler alındı",
      results: docs.length,
      data: docs,
    });
  });
