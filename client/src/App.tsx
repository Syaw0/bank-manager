import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./routs/dashboard";
import Login from "./routs/login";
import globalStyles from "./styles/global";
import Flex from "./styles/styledComponents/flex";

function App() {
  globalStyles();

  return (
    <Flex>
      <Routes>
        <Route path="/">
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Flex>
  );
}

export default App;
