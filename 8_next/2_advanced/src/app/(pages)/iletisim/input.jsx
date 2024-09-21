"use client";

import { useState } from "react";

const Input = () => {
  const [text, setText] = useState();

  return (
    <div className="my-10">
      <label>Selam, {text}</label>

      <input
        className="p-1"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <span className="bg-red-500 py-1 px-2 rounded-md text-lg">
        Client Component
      </span>
    </div>
  );
};

export default Input;
