import Container from "../../../components/container";
import Header from "../../../components/header";
import BreadCrumb from "../BreadCrumb";
import Title from "../Title";
import Images from "../Images";
import Overview from "../Overview";
import OrderBox from "../OrderBox";

const getDetail = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/vehicles/${id}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

const Page = async ({ params }) => {
  const data = await getDetail(params.id);

  return (
    <div>
      <Header designs="bg-black text-white" />

      <Container designs="mt-5">
        <BreadCrumb car={data.vehicle} />

        <Title car={data.vehicle} />

        <Images url={data.vehicle.imageUrl} />

        <div className="grid xl:grid-cols-5 gap-x-10 my-10">
          <div className="xl:grid-cols-3">
            <Overview car={data.vehicle} />
          </div>
          <div>
            <OrderBox car={data.vehicle} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
