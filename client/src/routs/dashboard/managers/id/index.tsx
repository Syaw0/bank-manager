import React from "react";
import AccountDetail from "../../../../components/dashboard/accountDetail";
import { randomManager } from "../../../../sharedData/fakeUsers";
import Flex from "../../../../styles/styledComponents/flex";

const ManagersID = () => {
  const data = randomManager;
  return (
    <Flex data-testid="managersID-route">
      <AccountDetail data={data} />
    </Flex>
  );
};

export default ManagersID;
