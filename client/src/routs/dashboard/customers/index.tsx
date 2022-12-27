import React from "react";
import ListUser from "../../../components/dashboard/listUsers";
import mainStore from "../../../store/mainStore";
import Flex from "../../../styles/styledComponents/flex";

const Customers = () => {
  const customers = mainStore((state) => state.listUserData);
  return (
    <Flex data-testid="customers-route">
      <ListUser type="Customer" userList={customers} />
    </Flex>
  );
};

export default Customers;
