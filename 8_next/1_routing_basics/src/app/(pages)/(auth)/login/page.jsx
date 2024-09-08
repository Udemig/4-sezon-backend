import { delay } from "../signup/page";

const Page = async () => {
  // api isteğini ismüle edeiyoruz:

  // 2 saniye bekle
  await delay(2000);

  // hata fırlat
  // throw new Error("Bu işlem için yetkiniz yok");

  return <div>Login Sayfası</div>;
};

export default Page;
