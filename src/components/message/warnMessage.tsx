import React from "react";
import Text from "../../styles/styledComponents/text";

const WarnMessage = ({ msg }: { msg: string }) => {
  return (
    <Text
      data-testid="warn-message"
      css={{
        backgroundColor: "$warn",
        color: "$onWarn",
        padding: "2px $2",
        borderRadius: "8px",
        margin: "$1 0",
      }}
    >
      {msg}
    </Text>
  );
};

export default WarnMessage;
