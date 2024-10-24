const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvents } = require("../utils");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ShoppingService();

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });

      // customer servisine siparişi haber vericez ki kullanıcı veirleri arasına sipaiş edilen ürünü eklesin
      const payload = service.GetOrderPayload(_id, data, "CREATE_ORDER");

      // customer servisine haber gönder
      await PublishCustomerEvents(payload);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.getCart(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
