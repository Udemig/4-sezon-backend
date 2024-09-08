import Link from "next/link";

const Comp2 = () => {
  return (
    <div>
      <Link className="text-base bg-blue-500 p-2 rounded" href="/comp1">
        1'e Geri Dön
      </Link>

      <h1 className="mt-10">2. Sayfa</h1>
    </div>
  );
};

export default Comp2;
