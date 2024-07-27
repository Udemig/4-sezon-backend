const c = require("../utils/catchAsync");
const Err = require("../utils/appError");
const User = require("../models/userModel");
const filterObject = require("../utils/filterObject");

exports.updateMe = c(async (req, res, next) => {
  // 1) Şifreyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm)
    return next(new Err(400, "Şifreyi bu route ile güncelleyemezsiniz"));

  // 2) İsteğin body kısmından sadece izin verilen değerleri al
  const filtred = filterObject(req.body, "name", "email");

  // 3) Kullanıcı bilgilerini güncelle
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtred, { new: true });

  // 4) Client'a cevap gönder
  res.status(200).json({ message: "Kullanıcı başarıyla güncellendi", user: updatedUser });
});

exports.deleteMe = c(async (req, res, next) => {});

exports.getAllUsers = (req, res) => {
  res.status(200).json("getAllUsers çalıştı");
};

exports.createUser = (req, res) => {
  res.status(200).json("createUser çalıştı");
};

exports.getUser = (req, res) => {
  res.status(200).json("getUser çalıştı");
};

exports.updateUser = (req, res) => {
  res.status(200).json("updateUser çalıştı");
};

exports.deleteUser = (req, res) => {
  res.status(200).json("deleteUser çalıştı");
};
