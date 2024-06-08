module.exports = (request) => {
  return new Promise((resolve, reject) => {
    try {
      // fonksiyonun göndericeği cevabı tanımla
      let body = "";

      // frontend'den body'nin her parçası geldiğinde onu al ve yukarıdaki değişkene ekle
      request.on("data", (chunck) => {
        body += chunck;
      });

      // yüklenme bittiğinde json verisini js verisine çevir
      request.on("end", () => {
        // fonksiyonun çağrıldığı yere body kısmını return et
        resolve(JSON.parse(body));
      });
    } catch (err) {
      // hata oluşursa hatayı döndür
      reject(err);
    }
  });
};
