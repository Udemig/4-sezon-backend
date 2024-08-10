const c = require("../utils/catchAsync");
const Err = require("../utils/appError");
const User = require("../models/userModel");
const filterObject = require("../utils/filterObject");
const factory = require("./handlerFactory");

exports.updateMe = c(async (req, res, next) => {
  // 1) Şifreyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm)
    return next(new Err(400, "Şifreyi bu route ile güncelleyemezsiniz"));

  // 2) İsteğin body kısmından sadece izin verilen değerleri al
  const filtred = filterObject(req.body, "name", "email");

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
