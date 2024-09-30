import { NextResponse as Res } from "next/server";
import Vehicle from "../../models/Vehicle";

export async function GET(req, { params }) {
  try {
    // param olarak gelen id'ye göre veritbanından eleman al
    const vehicle = await Vehicle.findById(params.id);

    // araç bulunamadıysa hata gönder
    if (!vehicle)
      return Res.json({ message: "Araç bulunamadı" }, { status: 404 });

    /// bulunduysa araça verilerini gönder
    return Res.json({
      vehicle,
      message: "Araç detayları alındı",
    });
  } catch (error) {
    return Res.json(
      { message: "Araç detayları alınamadı" }, //
      { status: 500 }
    );
  }
}
