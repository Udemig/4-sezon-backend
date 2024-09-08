import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link className="text-base bg-blue-500 p-2 rounded" href="/comp3">
        3'e Geri Dön
      </Link>
      <br />
      <br />
      Sayfa 4
    </div>
  );
};

export default Page;
