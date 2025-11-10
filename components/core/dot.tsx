import React, { FC } from "react";

interface DotProps {
  size: number;
  bgColor: string;
}

export const Dot: FC<DotProps> = ({ size, bgColor }) => {
  return (
    <div
      className={`rounded-full ${bgColor}`}
      style={{ width: size, height: size }}
    ></div>
  );
};
