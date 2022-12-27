import React from "react";
import IconType from "../../types/iconType";

const IconSearch = ({ height, width, onClick }: any) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 25 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 22L15.5 16M17.5 11C17.5 11.9193 17.3189 12.8295 16.9672 13.6788C16.6154 14.5281 16.0998 15.2997 15.4497 15.9497C14.7997 16.5998 14.0281 17.1154 13.1788 17.4672C12.3295 17.8189 11.4193 18 10.5 18C9.58075 18 8.6705 17.8189 7.82122 17.4672C6.97194 17.1154 6.20026 16.5998 5.55025 15.9497C4.90024 15.2997 4.38463 14.5281 4.03284 13.6788C3.68106 12.8295 3.5 11.9193 3.5 11C3.5 9.14348 4.2375 7.36301 5.55025 6.05025C6.86301 4.7375 8.64348 4 10.5 4C12.3565 4 14.137 4.7375 15.4497 6.05025C16.7625 7.36301 17.5 9.14348 17.5 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSearch;
