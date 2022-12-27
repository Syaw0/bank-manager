import React from "react";
import AddNewUser from "../../../components/dashboard/addNewUser";
import Flex from "../../../styles/styledComponents/flex";

const AddManager = () => {
  return (
    <Flex data-testid="addManager-route">
      <AddNewUser type="Manager" />
    </Flex>
  );
};

export default AddManager;
