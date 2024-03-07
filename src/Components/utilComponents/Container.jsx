import React from "react";

function Container({ children, className }) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      {children}
    </div>
  );
}

export default Container;
