const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(
        _id,
        txnNumber
      );
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // sepetteki ürünleri al
  async getCart({ _id }) {
    try {
      const cartItems = await this.repository.Cart(_id);
      return FormateData(cartItems);
    } catch (err) {
      throw err;
    }
  }

  // sepeti yönet
  async ManageCart(customerId, item, qty, isRemove) {
    try {
      const cartResult = await this.repository.AddCartItem(
        customerId,
        item,
        qty,
        isRemove
      );

      console.log("!!!!CART-RESULT", cartResult);

      return FormateData(cartResult);
    } catch (err) {
      throw err;
    }
  }

  // diğer servislerden gelen haberleri al
  async SubscribeEvents(payload) {
    console.log("🎾🎾payloadd", payload);

    const { event, data } = payload;
    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);

      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
    }
  }

  // gönderilecek haberi hazırlayan method
  GetOrderPayload(userId, order, event) {
    if (order) {
      const payload = {
        event,
        data: { userId, order },
      };

      return FormateData(payload);
    } else {
      return FormateData({ error: "Ürün mevcut değil" });
    }
  }
}

module.exports = ShoppingService;
