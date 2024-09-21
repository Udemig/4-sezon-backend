import Link from "next/link";
import { getRecipes } from "../constants";

const Header = async () => {
  const data = await getRecipes();

  return (
    <header className="border-b shadow p-4 w-full text-xl flex justify-between">
      <h1>Header</h1>

      <Link href="/home">Anasayfa {data.recipes.length}</Link>
    </header>
  );
};

export default Header;
