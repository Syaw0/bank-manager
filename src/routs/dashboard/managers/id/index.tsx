import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountDetail from "../../../../components/dashboard/accountDetail";
import Loader from "../../../../components/loader";
import Message from "../../../../components/message/message";
import mainStore from "../../../../store/mainStore";
import Flex from "../../../../styles/styledComponents/flex";
import getSpecificUser from "../../../../utility/dashboard/getSpecificUser";

const ManagersID = () => {
  const data = mainStore((state) => state.currentAccountDetail);
  const params: any = useParams();

  useEffect(() => {
    getUser();
  }, []);
  // TODO What if i just return mainAccount ? if user want see his account
  const getUser = async () => {
    setMsgState({ type: "waiting", msg: "please wait until server respond" });
    const result = await getSpecificUser(params.id, "manager");
    if (result.status) {
      setMsgState({ type: "idle", msg: result.msg });
      mainStore.getState().setCurrentAccountDetail(result.data);
      setIsReady(true);
      return;
    }
    setMsgState({ type: "error", msg: result.msg });
  };
  const [isReady, setIsReady] = useState(false);
  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });

  return (
    <Flex data-testid="managersID-route" dir="column">
      {isReady && <AccountDetail data={data} type="manager" />}
      {!isReady && msgState.type !== "error" && <Loader />}
      <Message type={msgState.type} msg={msgState.msg} />
    </Flex>
  );
};

export default ManagersID;
