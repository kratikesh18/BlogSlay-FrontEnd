import React from "react";

function Button({ type, text, className, eventFunc }) {
  return (
    <button
      onClick={eventFunc}
      type={type ? type : "none"}
      className={`py-3  px-5 bg-black font-bold rounded-xl text-white hover:bg-black/90 w-fit ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
