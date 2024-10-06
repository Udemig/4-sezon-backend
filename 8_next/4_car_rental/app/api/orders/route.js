import { NextResponse as Res } from "next/server";
import Order from "../models/Order";

export async function GET() {
  try {
    const orders = await Order.find().populate("product");

    return Res.json({ text: "Siparişler başarıyla alındı", orders });
  } catch (error) {
    return Res.json({ error: err.message }, { status: 500 });
  }
}
