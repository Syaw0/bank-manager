import React from "react";

const IconManager = ({ height, width }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0C10.21 0 12 1.79 12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4C4 1.79 5.79 0 8 0ZM12 10.54C12 11.6 11.72 14.07 9.81 16.83L9 12L9.94 10.12C9.32 10.05 8.67 10 8 10C7.33 10 6.68 10.05 6.06 10.12L7 12L6.19 16.83C4.28 14.07 4 11.6 4 10.54C1.61 11.24 0 12.5 0 14V18H16V14C16 12.5 14.4 11.24 12 10.54Z" />
    </svg>
  );
};

export default IconManager;
