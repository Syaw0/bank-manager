import React from "react";

const IconAddManager = ({ height, width }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 0C16.21 0 18 1.79 18 4C18 6.21 16.21 8 14 8C11.79 8 10 6.21 10 4C10 1.79 11.79 0 14 0ZM18 10.54C18 11.6 17.72 14.07 15.81 16.83L15 12L15.94 10.12C15.32 10.05 14.67 10 14 10C13.33 10 12.68 10.05 12.06 10.12L13 12L12.19 16.83C10.28 14.07 10 11.6 10 10.54C7.61 11.24 6 12.5 6 14V18H22V14C22 12.5 20.4 11.24 18 10.54Z" />
      <path d="M0 8V6H3V3H5V3.5V6H8V8H5V11H3V8H0Z" />
    </svg>
  );
};

export default IconAddManager;
