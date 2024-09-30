import Image from "next/image";
import gas from "../../assets/icons/gas.svg";
import mile from "../../assets/icons/mile.svg";
import transmission from "../../assets/icons/transmission.svg";
import arrow from "../../assets/icons/arr.svg";
import Link from "next/link";

const Card = ({ car }) => {
  // ekrana basarken kod tekrarı oluşmaması için bir dizi oluştur
  const arr = [
    {
      icon: mile,
      name: car.mileage + " Miles",
    },
    {
      icon: gas,
      name: car.fuelType,
    },
    {
      icon: transmission,
      name: car.transmission,
    },
  ];

  return (
    <div className="border shadow rounded hover:shadow-lg">
      <div className="relative h-[250px]">
        <Image
          src={car.imageUrl}
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="py-5 px-10 sm:px-5">
        <h2 className="text-2xl font-semibold">
          {car.make} {car.model}
        </h2>

        <hr className="border-[#E9E9E9] border-2 mt-2 mb-4" />

        <div className="flex justify-between">
          {arr.map((item) => (
            <div className="flex flex-col gap-2 items-center">
              <Image src={item.icon} alt="icon" />
              <p className="text-lg sm:text-base">{item.name}</p>
            </div>
          ))}
        </div>

        <hr className="border-[#E9E9E9] border-2 mt-2 mb-4" />

        <div className="flex justify-between text-2xl sm:text-xl">
          <p className="font-semibold">${car.price}</p>

          <Link
            className="text-blue-500 text-2xl sm:text-xl flex items-center gap-2 hover:text-blue-800 transition"
            href={`/car/${car._id}`}
          >
            Detay
            <Image src={arrow} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
