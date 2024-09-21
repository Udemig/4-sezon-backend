"use client";

import { usePathname, useSearchParams } from "next/navigation";

const Page = () => {
  const path = usePathname();
  console.log(path);

  const searchParams = useSearchParams();

  console.log(searchParams.get("fiyat"));
  console.log(searchParams.get("kategori"));
  console.log(searchParams.get("id"));

  return (
    <div>
      <h1>Hakkımızda Sayfası</h1>

      <span className="bg-red-500 py-1 px-2 rounded-md text-lg">
        Client Component
      </span>
    </div>
  );
};

export default Page;
