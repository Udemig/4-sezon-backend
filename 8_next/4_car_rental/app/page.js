import { redirect } from "next/navigation";

const Home = () => {
  redirect("/home");

  return <div>Home</div>;
};

export default Home;
