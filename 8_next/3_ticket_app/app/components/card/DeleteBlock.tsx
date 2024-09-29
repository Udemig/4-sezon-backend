"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

type Props = {
  id: string;
};

const DeleteBlock = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    // api isteği at
    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });

    // işlem başarılı olursa sayfayı yenile
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FaTrash
      onClick={handleDelete}
      className="cursor-pointer hover:text-red-500 transition"
    />
  );
};

export default DeleteBlock;
