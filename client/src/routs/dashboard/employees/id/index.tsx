import React from "react";
import AccountDetail from "../../../../components/dashboard/accountDetail";
import { randomEmployee } from "../../../../sharedData/fakeUsers";
import Flex from "../../../../styles/styledComponents/flex";

const EmployeesID = () => {
  const data = randomEmployee;
  return (
    <Flex data-testid="employeesID-route">
      <AccountDetail data={data} />
    </Flex>
  );
};

export default EmployeesID;
