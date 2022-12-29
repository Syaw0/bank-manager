import React from "react";
import { flip } from "../styles/keyframes";
import Flex from "../styles/styledComponents/flex";

const Loader = () => {
  return (
    <Flex
      data-testid="dash-listUser-loader"
      justify="center"
      align="center"
      css={{
        marginTop: "$10",
      }}
    >
      <Flex
        css={{
          width: "2em",
          height: "2em",
          backgroundColor: "$onPrimary900",
          boxShadow: "$1dp",
          transform: "rotate(0)",
          animation: `${flip} 1s infinite`,
        }}
      ></Flex>
    </Flex>
  );
};

export default Loader;
