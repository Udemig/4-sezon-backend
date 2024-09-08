import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link className="text-base bg-blue-500 p-2 rounded" href="/comp4">
        4'e Git
      </Link>
      <br />
      <br />
      Sayfa 3
    </div>
  );
};

export default Page;
