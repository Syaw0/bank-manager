import React from "react";
import IconType from "../../types/iconType";

const IconAddAccount = ({ height, width }: IconType) => {
  return (
    <svg
      width={width}
      height={height - 4}
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 10C11.33 10 6 11.33 6 14V16H22V14C22 11.33 16.67 10 14 10ZM5 6V3H3V6H0V8H3V11H5V8H8V6M14 8C15.0609 8 16.0783 7.57857 16.8284 6.82843C17.5786 6.07828 18 5.06087 18 4C18 2.93913 17.5786 1.92172 16.8284 1.17157C16.0783 0.421427 15.0609 0 14 0C12.9391 0 11.9217 0.421427 11.1716 1.17157C10.4214 1.92172 10 2.93913 10 4C10 5.06087 10.4214 6.07828 11.1716 6.82843C11.9217 7.57857 12.9391 8 14 8Z" />
    </svg>
  );
};

export default IconAddAccount;
