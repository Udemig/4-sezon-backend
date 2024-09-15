import Input from "./input";

const Page = () => {
  console.log("🎾 İletişim Render Oldu 🎾");

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
