import Image from "next/image";
import view from "./assets/view.jpg";

const Home = () => {
  const url =
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <div className="text-2xl font-semibold p-10 flex flex-col gap-20">
      <div>
        <h1>Local Resim (İndirdiğimiz)</h1>
        <Image
          width={1000}
          height={1200}
          src={view}
          quality={100}
          placeholder="blur"
          priority
        />
      </div>

      <div>
        <h1>Remote Resim (URL Tanımı)</h1>
        <Image width={300} height={300} src={url} />
      </div>

      <div>
        <h1>Remote Resim (Tam Genişlik)</h1>
        <div className="relative h-[250px] ">
          <Image fill src={url} />
        </div>
      </div>
    </div>
  );
};

export default Home;
