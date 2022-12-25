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
}: ButtonType) => {
  return (
    <Flex css={{ width: "100%", jc_ac: "", ...css }}>
      {StartIcon != null && <StartIcon />}
      <StyledButton disabled={disabled != null} type={type}>
        {placeholder}
      </StyledButton>
      {EndIcon != null && <EndIcon />}
    </Flex>
  );
};

export default Button;
