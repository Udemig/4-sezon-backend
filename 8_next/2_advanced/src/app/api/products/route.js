// http://localhost:3000/api/products adresine yapılcak olan bütün http isklerinde bu dosya devreye girer

import { NextResponse } from "next/server";
import { products } from "../data";

export function GET() {
  return NextResponse.json({ products });
}
