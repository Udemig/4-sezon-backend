"use client";

import { useState } from "react";
import Loader from "../../components/loader/index";

const OrderButton = ({ car }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    // backende ödeme sayfasının linkini oluşturması için satın alınacak aracın bilgileriyle birlikte istek at
    fetch(`http://localhost:3000/api/checkout`, {
      method: "POST",
      body: JSON.stringify(car),
    })
      .then((res) => res.json())
      .then((data) => (window.location.href = data.url))
      .finally(() => setIsLoading(false));
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="bg-blue-500 w-full text-center p-2 rounded-lg text-white font-bold transition hover:bg-blue-600 mt-5"
    >
      {isLoading ? <Loader /> : "Sipariş Et"}
    </button>
  );
};

export default OrderButton;
