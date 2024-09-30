import Car1 from "../../assets/images/car1.png";
import Car2 from "../../assets/images/car2.png";
import Car3 from "../../assets/images/car3.png";
import Car4 from "../../assets/images/car4.png";
import Image from "next/image";

const Images = ({ url }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative max-md:h-[300px]">
        <Image
          fill
          src={url}
          className="object-contain"
          alt="vehicle"
          unoptimized
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Image className="rounded-md" src={Car1} alt="car" />
        <Image className="rounded-md" src={Car2} alt="car" />
        <Image className="rounded-md" src={Car3} alt="car" />
        <Image className="rounded-md" src={Car4} alt="car" />
      </div>
    </div>
  );
};

export default Images;
