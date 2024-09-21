import Link from "next/link";
import { data } from "../../constants";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen p-5">
      <h1 className="text-center text-3xl font-bold my-10">
        Dünyanın 7 Harikası
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {data.map((item) => (
          <Link href={`/gallery/${item.id}`}>
            <Image
              src={item.src}
              className="w-full aspect-square object-cover rounded-md"
              quality={20}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
