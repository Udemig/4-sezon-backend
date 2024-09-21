import { products } from "../../data";

export function GET(req, { params }) {
  const found = products.find((i) => i.id == params.id);

  if (!found) {
    return Response.json({ text: "Aradığınız ürün bulunamadı" });
  }

  return Response.json({ item: found });
}

export function DELETE(req, { params }) {
  const filtred = products.filter((i) => i.id != params.id);

  return Response.json({
    message: "Başarıyla silindi",
    data: filtred,
  });
}
