import React from "react";
import AddNewUser from "../../../components/dashboard/addNewUser";
import Flex from "../../../styles/styledComponents/flex";

const AddCustomer = () => {
  return (
    <Flex data-testid="addCustomer-route">
      <AddNewUser type="Customer" />
    </Flex>
  );
};

export default AddCustomer;
