"use client";

import { TicketType } from "@/app/types";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type Props = {
  editItem: TicketType | null;
};

const Form = ({ editItem }: Props) => {
  const arr = new Array(5).fill("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formdata örneği al
    const formdata = new FormData(e.target as HTMLFormElement);

    // inputlardaki veirleri bir nesneye aktar
    const ticketData = Object.fromEntries(formdata.entries());

    if (editItem) {
      // düzenlenicek eleman varsa: güncelleme isteği at
      const res = await fetch(`/api/tickets/${editItem._id}`, {
        method: "PUT",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Ticket güncellenirken hata meydana geldi");
      }
    } else {
      // düzenlenicek eleman yoksa: oluşturma isteği at
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Ticket oluşturulurken hata meydana geldi");
      }
    }

    // başaırlı olursa anasayafa yönlendir
    router.push("/");

    // sayfayı yenile
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-3/4 md:1/2 my-4"
      >
        <h3>Ticket Oluştur</h3>

        <label>Başlık</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={editItem?.title}
        />

        <label>Açıklama</label>
        <textarea
          name="description"
          required
          defaultValue={editItem?.description}
        />

        <label>Kategori</label>
        <select name="category" defaultValue={editItem?.category}>
          <option>Yazılım Sorunu</option>
          <option>Donanım Sorunu</option>
          <option>Bağlantı Sorunu</option>
        </select>

        <label>Öncelik</label>
        <div>
          {arr.map((i, index) => (
            <>
              <input
                id={String(index + 1)}
                value={index + 1}
                type="radio"
                name="priority"
                defaultChecked={editItem?.priority === index + 1}
              />
              <label htmlFor="1">{index + 1}</label>
            </>
          ))}
        </div>

        <label>İlerleme</label>
        <input
          name="progress"
          type="range"
          min={0}
          max={100}
          defaultValue={editItem?.progress}
        />

        <label>Durum</label>
        <select name="status" required defaultValue={editItem?.status}>
          <option>Başlamadı</option>
          <option>Başladı</option>
          <option>Bitti</option>
        </select>

        <button className="btn mt-5">
          Ticket {editItem ? "Güncelle" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default Form;
