import React from "react";
import Text from "../../styles/styledComponents/text";

const ErrorMessage = ({ msg }: { msg: string }) => {
  return (
    <Text
      css={{
        backgroundColor: "$error",
        color: "$onError",
        padding: "2px $2",
        borderRadius: "8px",
        margin: "$1 0",
      }}
    >
      {msg}
    </Text>
  );
};

export default ErrorMessage;
