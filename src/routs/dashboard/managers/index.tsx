import React from "react";
import ListUser from "../../../components/dashboard/listUsers";
import mainStore from "../../../store/mainStore";
import Flex from "../../../styles/styledComponents/flex";

const Managers = () => {
  const managers = mainStore((state) => state.listUserData);
  return (
    <Flex data-testid="managers-route">
      <ListUser type="Manager" userList={managers} />
    </Flex>
  );
};

export default Managers;
