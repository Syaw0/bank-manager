import React from "react";
import Text from "../../styles/styledComponents/text";

const SuccessMessage = ({ msg }: { msg: string }) => {
  return (
    <Text
      css={{
        backgroundColor: "$success",
        color: "$onSuccess",
        padding: "2px $2",
        borderRadius: "8px",
        margin: "$1 0",
      }}
    >
      {msg}
    </Text>
  );
};

export default SuccessMessage;
