import React from "react";
import { Outlet } from "react-router-dom";
import Flex from "../../styles/styledComponents/flex";

const Dashboard = () => {
  return (
    <Flex data-testid="dashboard-route">
      im Dashboard
      <Outlet />
    </Flex>
  );
};

export default Dashboard;
