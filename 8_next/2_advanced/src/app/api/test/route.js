import { NextResponse } from "next/server";

// istek ile alakalı ayarları yapabilmek için config nesnesi export ederiz
export const config = {
  api: {
    // body içerisinde 500 kb altı veirleri kabul et
    bodyParser: {
      sizeLimit: "500kb",
    },

    //  gönderilecek cevap limiti
    responseLimit: "5mb",
  },
};

export async function GET(req, res) {
  return NextResponse.json({
    message: "Backenden gelen cevap",
    time: new Date().toLocaleTimeString(),
  });
}
