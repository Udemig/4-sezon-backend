import Image from "next/image";
import pp from "../../assets/images/pp.png";
import loc from "../../assets/icons/loc.svg";
import tel from "../../assets/icons/tel.svg";
import OrderButton from "./OrderButton";

const OrderBox = ({ car }) => {
  return (
    <div className="border shadow rounded-md p-5 max-xl:mt-10 w-full xl:col-span-2">
      <div className="flex gap-5">
        <Image src={pp} alt="profile" />

        <div className="text-lg">
          <h2 className="font-semibold">Udemig Galeri</h2>
          <p>İstanbul, Maltepe</p>
        </div>
      </div>

      <div className="flex justify-between my-5">
        <div className="flex gap-1 items-center cursor-pointer">
          <Image src={loc} alt="loc" />
          <span>Lokasyonu Gör</span>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <Image src={tel} alt="tel" />
          <span>+90 555 666 77 88</span>
        </div>
      </div>

      <OrderButton car={car} />

      <button className="bg-green-500 w-full text-center p-2 rounded-lg text-white font-bold transition hover:bg-green-600 mt-5">
        Whatsapp
      </button>
    </div>
  );
};

export default OrderBox;
