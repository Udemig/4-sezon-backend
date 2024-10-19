const { CustomerModel, OrderModel, CartModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId }).populate(
        "items.product"
      );
      return orders;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Orders"
      );
    }
  }

  async CreateNewOrder(customerId, txnId) {
    //check transaction for payment Status

    try {
      const profile = await CustomerModel.findById(customerId).populate(
        "cart.product"
      );

      if (profile) {
        let amount = 0;

        let cartItems = profile.cart;

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          profile.cart = [];

          order.populate("items.product").execPopulate();
          const orderResult = await order.save();

          profile.orders.push(orderResult);

          await profile.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  //müşteriye ait sepetteki ürünler ia
  async Cart(customerId) {
    try {
      const cartItems = await CartModel.find({ customerId });
      if (cartItems) {
        return cartItems;
      } else {
        throw new Error("Sepette ürün bulunamadı");
      }
    } catch (error) {
      throw error;
    }
  }

  //sepete yeni ürün ekle
  async AddCartItem(customerId, item, qty, isRemove) {
    const cart = await CartModel.findOne({ customerId });
    const { _id } = item;

    if (cart) {
      let isExist = false;
      let cartItems = cart.items;

      if (cartItems.length > 0) {
        cartItems.map((item) => {
          console.log("1", item, "2", _id);
          /*
1 {
  product: '670b76a1b9df09aa07a68481',
  unit: 1,
  _id: new ObjectId('67135b4b1f0b139ca02963ae')
} 2 670b76a8b9df09aa07a68483
          */

          if (item.product.toString() === _id.toString()) {
            if (isRemove) {
              cartItems.splice(cartItems.indexOf(item), 1);
            } else {
              item.unit = qty;
            }
            isExist = true;
          }
        });
      }

      if (!isExist && !isRemove) {
        cartItems.push({ product: { ...item }, unit: qty });
      }

      cart.items = cartItems;
      return await cart.save();
    } else {
      return await CartModel.create({
        customerId,
        items: [{ product: { ...item }, unit: qty }],
      });
    }
  }
}

module.exports = ShoppingRepository;
