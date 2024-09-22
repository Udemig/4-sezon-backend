import { NextResponse as Res } from "next/server";
import Ticket from "../models/Ticket";

// yeni ticket oluştur
export async function POST(req: Request) {
  try {
    // isteğin body kısmına eriş
    const body = await req.json();

    // veritbanına yeni ticket'ı kayder
    const newTicket = await Ticket.create(body);

    return Res.json(
      {
        message: "Ticket oluşturuldu",
        data: newTicket,
      },
      { status: 201 }
    );
  } catch (err) {
    return Res.json(
      {
        message: "Ticket oluşturulken bir hata meydana geldi",
      },
      {
        status: 500,
      }
    );
  }
}

// bütün ticket'ları client' gönder
export async function GET() {
  try {
    const tickets = await Ticket.find();

    return Res.json({
      tickets,
    });
  } catch (error) {
    return Res.json(
      {
        message: "Ticket oluşturulurken bir sorun oluştu",
      },
      { status: 500 }
    );
  }
}
