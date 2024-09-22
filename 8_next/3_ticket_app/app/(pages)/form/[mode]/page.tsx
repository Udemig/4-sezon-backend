import Form from "@/app/components/form";
import React from "react";

type Props = {
  params: {
    mode: string;
  };
};

const Page = ({ params }: Props) => {
  // parametreye göre sayfanın hangi modda çalışcağına karar ver
  // mode parametresi ya new yada düzenlinecek elemanın id'si
  const isEditMode = params.mode !== "new" ? true : false;

  return (
    <div>
      <Form />
    </div>
  );
};

export default Page;
