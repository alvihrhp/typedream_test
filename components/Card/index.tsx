import React, { ReactNode } from "react";

interface Props {
  bgColor: string;
  shadowColor: string;
  children: ReactNode;
}

const Card: React.FC<Props> = ({ bgColor, shadowColor, children }) => {
  return (
    <div className={`w-full p-4 shadow-lg rounded ${bgColor} ${shadowColor}`}>
      {children}
    </div>
  );
};

export default Card;
