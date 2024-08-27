import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link
      to={`/detail/${item._id}`}
      className=" p-2 rounded-md cursor-pointer flex flex-col gap-3 group"
    >
      <img
        className="h-full w-full object-cover rounded-md max-h-[200px]"
        src={item.cover}
      />

      <div className="flex gap-2 items-center">
        <img className="size-10 rounded-full" src={item.user.photo} />
        <p>
          <span className="font-semibold">{item.user.username} </span>
          tarafından
        </p>
      </div>

      <h2 className="line-clamp-2 group-hover:underline">{item.title}</h2>

      <div className="flex items-center gap-1 font-semibold text-lg">
        <FaStar />
        <span>4.9</span>
        <span className="font-normal text-gray-500">(1k)</span>
      </div>

      <p className="font-semibold">From ${item.price}</p>
    </Link>
  );
};

export default Card;
