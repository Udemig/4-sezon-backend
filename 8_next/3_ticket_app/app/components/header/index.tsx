import Link from "next/link";
import { FaHome, FaTicketAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-nav p-5 md:px-10 flex justify-between">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-gray-400 transition"
        >
          <FaHome />
          Anasayfa
        </Link>

        <Link
          href="/form/new"
          className="flex items-center gap-2 hover:text-gray-400 transition"
        >
          <FaTicketAlt />
          Oluşturma
        </Link>
      </div>

      <div>
        <p>Furkan</p>
      </div>
    </header>
  );
};

export default Header;
