// * Bir fonksiyonu parametre olarak alır
// * Fonksiyonu çalıştırır
// * Hata oluşursa hata middlware'ine yönlendir

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
