import { redirect } from "next/navigation";
import Input from "./input";

const Page = () => {
  const user = {
    name: "furkan",
    type: "user",
  };

  if (user.type !== "admin") {
    redirect("/hakkimizda");
  }

  return (
    <div className="p-5">
      <h1>İletişim Sayfası</h1>

      <span className="bg-blue-500 py-1 px-2 rounded-md text-lg">
        Server Component
      </span>

      <Input />
    </div>
  );
};

export default Page;
