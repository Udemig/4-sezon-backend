const c = require("../utils/catchAsync");
const Err = require("../utils/appError");
const User = require("../models/userModel");
const filterObject = require("../utils/filterObject");
const factory = require("./handlerFactory");
const multer = require("multer");
const AppError = require("../utils/appError");
const sharp = require("sharp");

// diskStorage kulumu
// const multerStorage = multer.diskStorage({
//   // dosyanın yükleneceği klasör
//   destination: function (req, file, cb) {
//     cb(null, "public/img/users");
//   },

//   // dosyanın ismi belirleme
//   filename: function (req, file, cb) {
//     // dosyanın uzantısını belirle
//     const ext = file.mimetype.split("/")[1];

//     // benzersiz bir dosya ismi tanımla
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// memory storage kurulumu (resimleri buffer olarak RAM'de saklar - geçici -)
const multerStorage = multer.memoryStorage();

// kullanıcı profil fotoğrafı olarak sadece image tipinde medyaları kabul eden filtre tanımla
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // eğerki dosya tipi resimse yüklenmeye izin ver
    cb(null, true);
  } else {
    // resim değilse izin verme ve hata fırlat
    cb(
      new AppError(
        400,
        "Profil fotoğrafı sadece resim olabilir (jpeg,jpg,png,webp)"
      )
    );
  }
};

// multer kurulum (dosyaların diskStorage'a yükleneceğini söyle)
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// kullanıcı 4k 30-40mb bir fotoğrafi profile fotoğrafı yapmaya çalışabilir.
// proje içerisinde profil fotoları genelde 40x40 veya 80x80 boyutlarında kullanırlır ama kullanıcı fotoğrafı seçerken 25000x1680 gibi yüksek kalite fotoğraflar seçebilir ve herhangi bir işlemden geçirmeden yüsek kalite fotoğrafı sunucuya kaydedersek gereksiz alan kaplar. Bu yüzden yüklenicek olan fotoğrafın çözünürlüğünü projede max boyut neyse ona indiricez. Bu da ort. her foto için 3-10 mb > 30-50 kb indiricek
exports.resize = (req, res, next) => {
  // eğer dosya yoksa boyutlandırma yapmadan sonraki adıma geç
  if (!req.file) return next();

  // diske kaydedilecek dosya ismini oluştur
  const filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // updateMe fonksiyonunda dosya ismine erişebilmek için req içersine ekle
  req.file.filename = filename;

  // dosyayı işle
  sharp(req.file.buffer)
    .resize(400, 400) // boyutu belirle
    .toFormat("jpeg") // resim formatını jpeg'e çevir
    .jpeg({ quality: 30 }) // kaliteyi değiştir
    .toFile(`public/img/users/${filename}`); // fotoyu diske kaydedicek

  next();
};

// dosya yükleme işlemini yapan mw
exports.uploadUserPhoto = upload.single("photo");

// hesap bilgilerini günceller
exports.updateMe = c(async (req, res, next) => {
  // 1) Şifreyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm)
    return next(new Err(400, "Şifreyi bu route ile güncelleyemezsiniz"));

  // 2) İsteğin body kısmından sadece izin verilen değerleri al
  let filtred = filterObject(req.body, "name", "email");

  // eğer isteğin içerisinde fotoğraf varsa kullanıcı bilgileri arasına storage yüklenen fotoğraf ismini ekle
  if (req.file) filtred.photo = req.file.filename;

  // 3) Kullanıcı bilgilerini güncelle
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtred, {
    new: true,
  });

  // 4) Client'a cevap gönder
  res.status(200).json({
    message: "Kullanıcı başarıyla güncellendi",
    user: updatedUser,
  });
});

exports.deleteMe = c(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({ message: "Hesap devre dışı bırakıldı" });
});

exports.getAllUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
