import Link from "next/link";

const Comp1 = () => {
  return (
    <div>
      <Link
        className="text-base bg-blue-500 p-2 rounded"
        href="/comp1/comp2"
      >
        2. Sayfa'ya Git
      </Link>

      <h1 className="mt-10">1. Sayfa</h1>
    </div>
  );
};

export default Comp1;
