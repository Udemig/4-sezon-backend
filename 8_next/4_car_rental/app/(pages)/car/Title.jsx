import mile from "../../assets/icons/mile.svg";
import gas from "../../assets/icons/gas.svg";
import year from "../../assets/icons/year.svg";
import transmission from "../../assets/icons/transmission.svg";
import Image from "next/image";
import millify from "millify";

const Title = ({ car }) => {
  const arr = [
    {
      icon: year,
      name: car.year,
    },
    {
      icon: mile,
      name: millify(car.mileage) + " Miles",
    },
    {
      icon: transmission,
      name: car.transmission,
    },
    {
      icon: gas,
      name: car.fuelType,
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex justify-between text-3xl md:text-4xl">
        <h1 className="font-bold">
          {car.make} {car.model}
        </h1>

        <p className="font-semibold">${car.price.toLocaleString()}</p>
      </div>

      <div className="flex gap-5 mt-5">
        {arr.map((item) => (
          <div className="py-1 px-3 rounded-full bg-blue-500/30 flex gap-1 items-center md:mb-5">
            <Image width={15} height={15} src={item.icon} alt="icon" />
            <span className="text-xs md:text-base">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Title;
