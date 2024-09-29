import Ticket from "../../models/Ticket";

type Params = {
  params: {
    id: string;
  };
};

//* id'ai bilinenen ticket'ı siler
export async function DELETE(req: Request, { params }: Params) {
  try {
    await Ticket.findByIdAndDelete(params.id);

    return Response.json({
      message: "Başarıyla Sİlindi",
    });
  } catch (err) {
    return Response.json(
      {
        message: "Silinirken hata oluştu",
        err,
      },
      { status: 500 }
    );
  }
}

//* id'si bilinene ticket'ı döndürür
export async function GET(req: Request, { params }: Params) {
  try {
    const ticket = await Ticket.findById(params.id);

    return Response.json({ ticket });
  } catch (err) {
    return Response.json(
      { message: "Ticket verisi alınırken bir hata oluştu", err },
      { status: 500 }
    );
  }
}

//* id'si ve güncel değerleri bilinen elemanı güncelle
export async function PUT(req: Request, { params }: Params) {
  try {
    // isteğin body'sinde gelen veriye eriş
    const body = await req.json();

    // veritabanındaki ticket'ı güncelle
    const updated = await Ticket.findByIdAndUpdate(params.id, body);

    // client'a cevap gönder
    return Response.json({ updated });
  } catch (err) {
    return Response.json(
      { message: "Ticket güncellenirken bir hata oluştu", err },
      { status: 500 }
    );
  }
}
