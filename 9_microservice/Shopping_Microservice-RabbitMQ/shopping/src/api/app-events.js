// Microservice mimriasinden servisler arası haberleşme sağlamamız gereken durumlar olacaktır. Bu durumda farklı servislerden /app-events yoluna gelen gelen api isteklerini dinleyicğiz  ve gelen olaya göre bu servisteki gerekli methodları çalıştırıcaz

const ShoppingService = require("../services/shopping-service");

module.exports = (app) => {
  const service = new ShoppingService();

  app.use("/app-events", async (req, res) => {
    // isteğin body kımında gelen veriye eriş
    const { payload } = req.body;

    // gelen olaya göre doğru methodu çalışıtırcak servis fonksiyonu
    service.SubscribeEvents(payload);

    console.log("======== Shopping Servisine Haber Geldi ========");

    return res.status(200).json(payload);
  });
};
