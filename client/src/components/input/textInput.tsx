import React from "react";
import Flex from "../../styles/styledComponents/flex";
import StyledTextInput from "../../styles/styledComponents/input/styledTextInput";
import Text from "../../styles/styledComponents/text";
import { TextInputType } from "../../types/inputType";

const TextInput = ({
  type,
  label,
  onChange,
  placeholder,
  value,
  css,
  disabled,
  dataTestid,
}: TextInputType) => {
  return (
    <Flex dir={"column"} css={css}>
      <Text
        css={{
          color: "$onBg800",
          width: "100%",
          justifyContent: "start",
        }}
        size={"sHead1"}
        weight={"500"}
      >
        {label} :
      </Text>
      <StyledTextInput
        data-testid={dataTestid}
        disabled={disabled != false}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </Flex>
  );
};

export default TextInput;
