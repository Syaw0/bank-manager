import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/dashboard/navbar";
import Flex from "../../styles/styledComponents/flex";

const Dashboard = () => {
  return (
    <Flex css={{ height: "100%" }} data-testid="dashboard-route">
      <Navbar />
      <Flex>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
