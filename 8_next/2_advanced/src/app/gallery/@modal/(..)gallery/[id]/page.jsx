"use client";

import { data } from "@/app/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Detail = ({ params }) => {
  const item = data.find((i) => i.id === params.id);
  const router = useRouter();

  const close = () => {
    // 1 sayfa geriye
    router.back();

    // 1 sayfa ileriye
    // router.forward()

    // belirli bir yola yönlendir
    // router.push("/")

    // sayfayı yeniler
    // router.refresh()
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center">
      <div className="bg-white rounded-md px-10 pb-10 text-black text-5xl flex flex-col gap-5">
        <div className="flex justify-between my-5 text-lg">
          <button
            onClick={close}
            className="size-10 border border-black rounded-lg transition hover:bg-black/10"
          >
            X
          </button>
          <button
            onClick={refresh}
            className="size-10 border border-black rounded-lg transition hover:bg-black/10"
          >
            ?
          </button>
        </div>

        <Image
          className="w-full max-h-[400px] pbjext-cover aspect-square rounded-md"
          src={item.src}
        />

        <div>
          <h2>{item.name}</h2>
        </div>

        <div className="text-xl flex flex-col">
          <span className="font-[100]">Fotoğrafçı</span>
          <span>{item.photographer}</span>
        </div>
        <div className="text-xl flex flex-col">
          <span className="font-[100]">Lokasyon</span>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
