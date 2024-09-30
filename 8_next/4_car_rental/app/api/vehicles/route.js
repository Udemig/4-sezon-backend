import { NextResponse as Res } from "next/server";
import Vehicle from "../models/Vehicle";

export async function GET() {
  try {
    const vehicles = await Vehicle.find();

    return Res.json({
      vehicles,
      message: "Araç verileri alındı",
    });
  } catch (error) {
    return Res.json(
      { message: "Araç verileri alınamadı" }, //
      { status: 500 }
    );
  }
}
