const Overview = ({ car }) => {
  // nesnenin değerlerinden oluşan bir dizi tanımla
  const arr = Object.entries(car).filter(
    ([key]) => key !== "_id" && key !== "imageUrl"
  );

  return (
    <div className="grid md:grid-cols-2 mt-5 gap-5">
      {arr.map(([key, value]) => (
        <p className="flex justify-between capitalize">
          <span>{key}</span>
          <span className="font-semibold">{value}</span>
        </p>
      ))}
    </div>
  );
};

export default Overview;
