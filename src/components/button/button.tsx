import React from "react";
import StyledButton from "../../styles/styledComponents/button/button";

const Button = ({
  placeholder,
  css,
  type,
  EndIcon,
  StartIcon,
  disabled,
  onClick,
  dataTestid,
  color,
}: ButtonType) => {
  return (
    <StyledButton
      data-testid={dataTestid}
      onClick={onClick}
      css={css}
      disabled={disabled == null ? false : disabled}
      type={type}
      color={color}
    >
      {StartIcon != null && StartIcon}
      {placeholder}
      {EndIcon != null && EndIcon}
    </StyledButton>
  );
};

export default Button;
