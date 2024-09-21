"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => router.back()}>Geri</button>

      <button onClick={() => router.forward()}>İleri</button>

      <button onClick={() => router.refresh()}>Yenile</button>

      <button onClick={() => router.push("/home")}>Yönlendir</button>
    </div>
  );
};

export default Page;
