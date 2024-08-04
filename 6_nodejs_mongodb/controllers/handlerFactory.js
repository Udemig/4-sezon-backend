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
