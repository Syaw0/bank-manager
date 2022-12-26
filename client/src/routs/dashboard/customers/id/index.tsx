import React from "react";
import AccountDetail from "../../../../components/dashboard/accountDetail";
import { randomCustomer } from "../../../../sharedData/fakeUsers";
import Flex from "../../../../styles/styledComponents/flex";

const CustomersID = () => {
  const data = randomCustomer;
  return (
    <Flex data-testid="customersID-route">
      <AccountDetail data={data} />
    </Flex>
  );
};

export default CustomersID;
