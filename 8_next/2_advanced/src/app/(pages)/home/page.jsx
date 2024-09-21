import Image from "next/image";
import { getRecipes } from "../constants";

// home sayfası static oludğu için sadece build anında api isteğini atıcak daha sonra sayfa oluşturulcak ama api'dan dönen cevapta bir değişiklik olduğunda ekrana yansımıası için 3600 saniye sonrasında yapılacka istekte static olan sayfanın tekrardan oluşturulmasını istedik
export const revalidate = 3600;

// Bir sever component'da api isteği atılıcaksa component async yapılmalı
const Home = async () => {
  // api isteğini at
  const data = await getRecipes();

  return (
    <div className="p-10 text-xl">
      <h1 className="font-bold mb-5">Anasayfa</h1>

      {data.recipes.map((item) => (
        <div className="flex gap-4 mb-5 border p-2 rounded-md">
          <Image
            src={item.image}
            alt="yemek"
            width={150}
            height={150}
            className="rounded-md"
          />

          <div>
            <h1>{item.name}</h1>
            <h2>{item.cuisine}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
