import Container from "../../components/container";
import Header from "../../components/header";
import OrderCard from "./OrderCard";

const getOrders = async () => {
  const res = await fetch(`http://localhost:3000/api/orders`, {
    cache: "no-store",
  });

  return res.json();
};

const Orders = async () => {
  const data = await getOrders();

  return (
    <div>
      <Header />

      <Container>
        <h2 className="mb-10 text-4xl font-bold">Sipraişlerin</h2>

        <div className="grid gap-10">
          {data.orders.map((order, key) => (
            <OrderCard key={key} order={order} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Orders;
