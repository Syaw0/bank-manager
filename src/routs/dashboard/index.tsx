import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/dashboard/navbar";
import Loader from "../../components/loader";
import Message from "../../components/message/message";
import mainStore from "../../store/mainStore";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import whoami from "../../utility/dashboard/whoami";
import capitalizeFirstLetter from "../../utility/global/capitalizeFirstLetter";

const Dashboard = () => {
  useEffect(() => {
    getMainAccountData();
  }, []);

  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });

  const getMainAccountData = async () => {
    setMsgState({ type: "waiting", msg: "wait until data come from server" });
    const result = await whoami();
    if (result.status) {
      setMainAccount(result.data);
      setMsgState({
        type: "success",
        msg: "data come from server successfully",
      });
      return;
    }
    setMsgState({ type: "error", msg: "error with get data from server" });
  };
  const setMainAccount = mainStore((state) => state.setMainAccount);
  const data = mainStore((state) => state.mainAccount);
  return msgState.type == "waiting" || msgState.type == "error" ? (
    <>
      <Flex dir="column">
        <Loader />
        <Message type={msgState.type} msg={msgState.msg} />
      </Flex>
    </>
  ) : (
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
