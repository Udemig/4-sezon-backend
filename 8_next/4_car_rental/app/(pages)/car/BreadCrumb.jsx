import Link from "next/link";

const BreadCrumb = ({ car }) => {
  return (
    <div>
      <Link href="/home" className="text-blue-500">
        Anasayfa
      </Link>{" "}
      / <span>Arabalar</span> /{" "}
      <span>
        {car.make} {car.model}
      </span>
    </div>
  );
};

export default BreadCrumb;
