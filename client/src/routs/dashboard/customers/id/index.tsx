import React from "react";
import AccountDetail from "../../../../components/dashboard/accountDetail";
import mainStore from "../../../../store/mainStore";
import Flex from "../../../../styles/styledComponents/flex";

const CustomersID = () => {
  const data = mainStore.getState().mainAccount;
  return (
    <Flex data-testid="customersID-route">
      <AccountDetail data={data} />
    </Flex>
  );
};

export default CustomersID;
