"use client";

const Page = () => {
  console.log("🎾 Hakkımızda Render Oldu 🎾");

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
