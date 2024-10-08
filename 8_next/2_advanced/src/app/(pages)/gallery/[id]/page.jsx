import { data } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";

const Detail = ({ params }) => {
  // data dizisi içerisinden id'si bilinen elemanı al
  const item = data.find((i) => i.id === params.id);

  return (
    <div className="h-screen container mx-auto my-20 text-3xl">
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <Link className="text-lg border p-2 px-4 rounded-md" href=".">
          Geri
        </Link>

        <h1 className="text-center text-5xl  font-bold mt-10 mb-5">
          {item.name}
        </h1>

        <Image
          src={item.src}
          className="w-full object-cover aspect-square rounded-md"
        />

        <div className="my-10">
          <h3 className="text-lg">Fotoğrafçı:</h3>
          <span>{item.photographer}</span>
        </div>
        <div className="my-10">
          <h3 className="text-lg">Lokasyon:</h3>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
