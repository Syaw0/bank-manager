import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./routs/dashboard";
import AddCustomer from "./routs/dashboard/addCustomer";
import AddEmployee from "./routs/dashboard/addEmployee";
import AddManager from "./routs/dashboard/addManager";
import Customers from "./routs/dashboard/customers";
import CustomersID from "./routs/dashboard/customers/id";
import Employees from "./routs/dashboard/employees";
import EmployeesID from "./routs/dashboard/employees/id";
import MakeTransaction from "./routs/dashboard/makeTransaction";
import Managers from "./routs/dashboard/managers";
import ManagersID from "./routs/dashboard/managers/id";
import Login from "./routs/login";
import globalStyles from "./styles/global";
import Flex from "./styles/styledComponents/flex";

function App() {
  globalStyles();

  return (
    <Flex id="holder">
      <Routes>
        <Route path="/">
          <Route path="/dash" element={<Dashboard />}>
            <Route path="managers" element={<Managers />} />
            <Route path="managers/:id" element={<ManagersID />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:id" element={<EmployeesID />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomersID />} />
            <Route path="makeTransaction" element={<MakeTransaction />} />
            <Route path="addManager" element={<AddManager />} />
            <Route path="addCustomer" element={<AddCustomer />} />
            <Route path="addEmployee" element={<AddEmployee />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Flex>
  );
}

export default App;
