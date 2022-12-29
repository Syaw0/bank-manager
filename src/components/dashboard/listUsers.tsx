import React, { useEffect, useState } from "react";
import mainStore from "../../store/mainStore";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import { MessageType } from "../../types/messageType";
import getUserListData from "../../utility/dashboard/getUserListData";
import search from "../../utility/dashboard/search";
import SearchInput from "../input/searchInput";
import Loader from "../loader";
import Message from "../message/message";
import ListTable from "./listTable";

const ListUser = ({ userList, type }: { userList: any; type: string }) => {
  useEffect(() => {
    if (userList.length != 0) {
      mainStore.getState().setListUser([]);
    }
    getData();
  }, []);

  const [searchInp, setSearchInp] = useState("");

  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });

  const startSearch = async (e: any) => {
    if ((e.type == "click" || e.key === "Enter") && searchInp.trim() != "") {
      setMsgState({ type: "waiting", msg: "wait until search finished" });
      setIsReady(false);
      setSearchInp("");
      const result = await search(searchInp);
      if (result.status) {
        setMsgState({ type: "idle", msg: result.msg });
        mainStore.getState().setListUser(result.data);
        setIsReady(true);
      } else {
        setMsgState({ type: "error", msg: result.msg });
        setIsReady(true);
      }
    }
  };

  const searchInpChange = (e: any) => {
    const inpData = e.currentTarget.value;
    setSearchInp(inpData);
  };

  const getData = async () => {
    setMsgState({ type: "waiting", msg: "wait to get data from server" });
    const result = await getUserListData(type);
    if (result.status) {
      mainStore.getState().setListUser(result.data);
      setMsgState({ type: "idle", msg: "ok" });
      setIsReady(true);
      return;
    }
    setMsgState({ type: "error", msg: result.msg });
  };

  const [isReady, setIsReady] = useState(false);
  return (
    <Flex
      dir="column"
      justify="start"
      align="center"
      css={{ overflowY: "auto", padding: " 0 $1" }}
    >
      <Flex
        justify="between"
        align="center"
        css={{
          marginTop: "$4",
        }}
      >
        <Text
          size="h4"
          weight="500"
          css={{ justifyContent: "start", color: "$onBg900" }}
        >
          {type}
        </Text>
        <SearchInput
          value={searchInp}
          onChange={searchInpChange}
          onClick={startSearch}
          onKeyDown={startSearch}
          dataTestid="dash-list-search"
          disabled={false}
          placeholder="search for user"
          css={{
            width: "fit-content",
          }}
          type="search"
        />
      </Flex>

      {isReady ? (
        <ListTable data={userList} type={type} />
      ) : (
        msgState.type !== "error" && <Loader />
      )}
      <Message type={msgState.type} msg={msgState.msg} />
    </Flex>
  );
};

export default ListUser;
