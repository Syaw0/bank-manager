import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/dashboard/navbar";
import mainStore from "../../store/mainStore";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import capitalizeFirstLetter from "../../utility/global/capitalizeFirstLetter";

const Dashboard = () => {
  const data = mainStore.getState().mainAccount;
  return (
    <Flex css={{ height: "100%" }} data-testid="dashboard-route">
      <Navbar />
      <Flex
        dir="column"
        justify="start"
        align="center"
        css={{
          padding: "$1 $5",
        }}
      >
        <Flex
          css={{
            borderBottom: "1px solid $onBg200",
            padding: "$1 0",
          }}
        >
          <Text
            size="sHead1"
            weight="600"
            css={{ color: "$onBg", paddingRight: "5px" }}
          >
            {capitalizeFirstLetter(data.name)}{" "}
            {capitalizeFirstLetter(data.familyName)}
          </Text>

          <Text size="sHead2" weight="300" css={{ color: "$onBg800" }}>
            ({capitalizeFirstLetter(data.type)})
          </Text>
        </Flex>

        <Flex css={{ overflow: "hidden" }}>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
