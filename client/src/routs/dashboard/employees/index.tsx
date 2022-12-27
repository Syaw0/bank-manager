import React from "react";
import ListUser from "../../../components/dashboard/listUsers";
import mainStore from "../../../store/mainStore";
import Flex from "../../../styles/styledComponents/flex";

const Employees = () => {
  const employees = mainStore((state) => state.listUserData);
  return (
    <Flex data-testid="employees-route">
      <ListUser type="Employee" userList={employees} />
    </Flex>
  );
};

export default Employees;
