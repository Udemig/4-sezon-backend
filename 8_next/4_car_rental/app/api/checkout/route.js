import { NextResponse as Res } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

// frontend satın alınacak ürünnü bilgileriyle buraya istek atıcak

const getActiveProducts = async () => {
  // katalogdaki ürünleri al
  let stripeProducts = await stripe.products.list();

  // aktif ürünleri filtrele
  return stripeProducts.data.filter((i) => i.active);
};

export const POST = async (req) => {
  //1) isteğin body kısmında gelen satın alınacak araç verisini al
  const car = await req.json();

  //2) stripe catalog'una kaydedilmiş ürünleri al
  const stripeProducts = await getActiveProducts();

  //3) satın alınacak ürün catalog'da var mı kontrol et
  let foundProduct = stripeProducts.find(
    (i) => i.metadata.product_id === car._id
  );

  //4) catalog'da yok ise satın alınacak ürünü cataloga ekle
  if (!foundProduct) {
    foundProduct = await stripe.products.create({
      name: car.make + " " + car.model,
      images: [car.imageUrl],
      default_price_data: {
        unit_amount: car.price * 100,
        currency: "USD",
      },
      metadata: {
        product_id: car._id,
      },
    });
  }

  //! Fiyat güncellemesini kontrol et
  // ürünün stripe catalog'undaki fiyatına eriş
  const stripePrice = await stripe.prices.retrieve(
    foundProduct.default_price
  );

  // eğer stripe catalog'undaki fiyat ile api isteğiyle gelen fiyat farklıysa yeni bir fiyat oluşturup catalog verisini güncelle
  if (stripePrice.unit_amount !== car.price) {
    // yeni fiyat oluştur
    const newPrice = await stripe.prices.create({
      unit_amount: car.price * 100, // api'dan gelen fiyat
      currency: "USD",
      product: foundProduct.id,
    });

    // catalog'daki ürünün fiyatını güncelle
    foundProduct = await stripe.products.update(foundProduct.id, {
      default_price: newPrice.id,
    });
  }

  //! Vergi oranı ekle
  const tax_rate = await stripe.taxRates.create({
    display_name: "KDV",
    inclusive: false,
    percentage: 25,
    country: "TR",
  });

  //! Teslimat oranı ekle
  const shippingRate = await stripe.shippingRates.create({
    display_name: "Araç Teslimat",
    type: "fixed_amount",
    fixed_amount: {
      amount: 1200 * 100,
      currency: "usd",
    },
    delivery_estimate: {
      minimum: {
        unit: "business_day",
        value: 7,
      },
      maximum: {
        unit: "business_day",
        value: 14,
      },
    },
  });

  //5) ürünün stripe tarafından oluşturulan id'sini ve satın alınacak ürün miktaırnı bir nesne haline getir
  const product_info = {
    price: foundProduct.default_price,
    quantity: 1,
  };

  //6) ödeme oturumu (url) oluştur
  const session = await stripe.checkout.sessions.create({
    line_items: [{ ...product_info, tax_rates: [tax_rate.id] }],
    shipping_options: [{ shipping_rate: shippingRate.id }],
    mode: "payment",
    success_url: "http://localhost:3000" + "/success",
    cancel_url: "http://localhost:3000" + "/cancel",
  });

  //7) satın alım url'ini client'a döndür
  return Res.json({ url: session.url });
};
