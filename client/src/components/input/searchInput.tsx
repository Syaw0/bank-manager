import React from "react";
import IconSearch from "../../assest/icons/IconSearch";
import Flex from "../../styles/styledComponents/flex";
import StyledTextInput from "../../styles/styledComponents/input/styledTextInput";
import Text from "../../styles/styledComponents/text";
import { TextInputType } from "../../types/inputType";

const SearchInput = ({
  type,
  onChange,
  placeholder,
  value,
  css,
  disabled,
  dataTestid,
  name,
  onClick,
  onKeyDown,
}: TextInputType) => {
  return (
    <Flex
      onKeyDown={onKeyDown}
      dir={"column"}
      css={{
        position: "relative",
        "& svg": {
          stroke: "$onBg800",
          fill: "none",
          position: "absolute",
          right: "$1",
          top: "$2",
          cursor: "pointer",
        },
        ...css,
      }}
    >
      <StyledTextInput
        data-testid={dataTestid}
        disabled={disabled != false}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name != null ? name : ""}
      />
      <IconSearch onClick={onClick} width={20} height={20} />
    </Flex>
  );
};

export default SearchInput;
