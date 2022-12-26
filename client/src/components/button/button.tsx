import React from "react";
import Flex from "../../styles/styledComponents/flex";
import StyledButton from "../../styles/styledComponents/button/button";
import { ButtonType } from "../../types/buttonType";

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
