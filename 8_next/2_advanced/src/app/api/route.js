// Her bir endpoint oluşturmak için route.js tanımlamalıyız
// Şuan api klasörü içerisinde route.js oluşturduğumuz için http://localhost:3000/api adresine yapılcak olan bütün http isklerinde bu dosya devreye girer

import { NextResponse } from "next/server";

// Route Handler
// Gelen http isteklerini ele alan ve client'a cevap gönderen fonksiyonlar
// Bu fonksiyonları tanımlarken http methodlarının isimleriyle tanımlarız
// Aynı route dosyasında aynı method isminde tek bir method olabilir

export function GET() {
  return NextResponse.json({
    text: "Backende gelen GET isteğine cevap",
  });
}

export function POST() {}

export function DELETE() {}
