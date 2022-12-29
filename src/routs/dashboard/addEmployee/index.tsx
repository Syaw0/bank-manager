import React from "react";
import AddNewUser from "../../../components/dashboard/addNewUser";
import Flex from "../../../styles/styledComponents/flex";

const AddEmployee = () => {
  return (
    <Flex data-testid="addEmployee-route">
      <AddNewUser type="Employee" />
    </Flex>
  );
};

export default AddEmployee;
