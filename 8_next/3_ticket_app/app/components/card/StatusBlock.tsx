type Props = {
  status: string;
};

const StatusBlock = ({ status }: Props) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case "başladı":
        return "orange";

      case "başlamadı":
        return "red";

      case "bitti":
        return "green";

      default:
        return "gray";
    }
  };

  return (
    <span
      style={{ background: getColor() }}
      className="inline-block rounded-full bg-green-500 px-2 py-1 font-semibold text-xs"
    >
      {status}
    </span>
  );
};

export default StatusBlock;
