import Form from "@/app/components/form";
import React from "react";

type Props = {
  params: {
    mode: string;
  };
};

// id'si bilinene ticket'ın verilerini alır
const getTicketById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`);

  if (!res.ok) {
    throw new Error("Verileri alırken bir sorun oluşutu");
  }

  return res.json();
};

const Page = async ({ params }: Props) => {
  // parametreye göre sayfanın hangi modda çalışcağına karar ver
  // mode parametresi ya new yada düzenlinecek elemanın id'si
  const isEditMode = params.mode !== "new" ? true : false;

  let editItem = null;

  // güncelleme modunda isek id'si bilinen ticket'ın verilerini api'dan al
  if (isEditMode) {
    const data = await getTicketById(params.mode);
    editItem = data.ticket;
  }

  return (
    <div>
      <Form editItem={editItem} />
    </div>
  );
};

export default Page;
