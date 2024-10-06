import Image from "next/image";

const OrderCard = ({ order }) => {
  console.log(order);

  return (
    <div className="border ps-0 p-5 rounded-md gap-0 shadow grid items-center grid-cols-3 xl:grid-cols-5 hover:bg-zinc-100/10 transition cursor-pointer hover:shadow-lg">
      <Image
        src={order.product.imageUrl}
        width={200}
        height={200}
        alt={order.product.make}
        unoptimized
      />

      <h2 className="flex  max-md:flex-col gap-1">
        <span>{order.product.make}</span>
        <span className="font-bold md:ms-2">{order.product.model}</span>
      </h2>

      <h2 className="flex max-md:flex-col gap-1">
        <span className="whitespace-nowrap">Ödenen Tutar:</span>
        <span className="font-bold text-green-600">
          {order.money_spend}
        </span>
      </h2>

      <h2 className="flex max-md:flex-col gap-1 max-xl:ps-7">
        <span className="whitespace-nowrap">Alım Tarihi:</span>
        <span className="font-bold text-blue-600">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </h2>

      <h2 className="flex max-md:flex-col gap-1">
        <span className="whitespace-nowrap">Ödeme Tipi:</span>
        <span className="font-bold text-blue-600">{order.type}</span>
      </h2>
    </div>
  );
};

export default OrderCard;
