import React from "react";

function Button({ type, text, className }) {
  return (
    <button
      type={type ? type : "none"}
      className={`py-3  px-5 bg-black font-bold rounded-xl text-white hover:bg-black/60 w-fit ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
