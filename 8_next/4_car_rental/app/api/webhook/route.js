import { headers } from "next/headers";
import { NextResponse as Res } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

// Eğer ödeme başarılı olursa stripe buraya post isteği atıcak bizde ödemenin başarılı olduğunu anlayıp gerekli işlemleri yapıcaz

export async function POST(req) {
  //1) isteğin body kısmındaki olay verisine eriş
  const body = await req.json();

  //2) ödeme başarılı olduysa satı nalınan ürünün veirlerine eriş
  if (body.type === "checkout.session.completed") {
    // ödeme oturmun verileri
    const session = body.data.object;

    // ödeme oturumunda satın alınan ürünlerin verisine eriş
    const line_items = await stripe.checkout.sessions.listLineItems(
      session.id
    );

    // satın alınan ürünün stripe catalog'undaki verilere eriş
    const item = await stripe.products.retrieve(
      line_items.data[0].price.product
    );

    // kendi veritabanımıza kaydediceğimiz sipariş verisni oluştur
    const orderItem = {
      product: item.metadata.product_id,
      money_spend: session.amount_total / 100,
      currency: session.currency,
      type: line_items.data[0].price.type,
    };

    console.log("Session", session);

    console.log("Line Items", line_items.data[0]);

    // satın alınan ürünü kendi veritabanımıza kaydet

    // client'a cevap gönder
  }
  return Res.json({ status: "success" });
}
