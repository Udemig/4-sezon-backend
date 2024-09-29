import { NextResponse as Res } from "next/server";

export async function GET() {
  try {
    Res.json({
      message: "Araç verileri alındı",
    });
  } catch (error) {
    Res.json(
      { message: "Araç verileri alınamadı" }, //
      { status: 500 }
    );
  }
}
