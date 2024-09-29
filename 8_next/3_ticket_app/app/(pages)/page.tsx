import Card from "../components/card";
import { TicketType } from "../types";

type ResType = {
  tickets: TicketType[];
};

const getTickets = async (): Promise<ResType> => {
  const res = await fetch("http://localhost:3000/api/tickets", {
    cache: "no-store",
  });

  return res.json();
};

const Home = async () => {
  const { tickets } = await getTickets();

  // kategorilerden oluşan bir dizi oluştur (her kategoriden 1 tane olmalı)
  const categories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      {categories.map((category, key) => (
        <div key={key} className="mb-4">
          <h2 className="mb-2">{category}</h2>

          <div className="lg:grid grid-cols-2 xl:grid-cols-4 lg:gap-5">
            {tickets
              .filter((ticket) => ticket.category === category)
              .map((ticket, key) => (
                <Card key={key} ticket={ticket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
