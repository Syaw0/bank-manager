import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import accessibility from "./metaData";

const initialState = mainStore.getState();

describe("dashboard navigation", () => {
  afterEach(() => {
    mainStore.setState(initialState, true);
  });
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/dash"]}>
        <App />
      </MemoryRouter>
    );
  });
  it("navigate to my account page(im manager)", () => {
    fireEvent.click(screen.getByTestId("dash-myAccount-manager-button"));
    expect(screen.getByTestId("managersID-route")).toBeInTheDocument();
  });

  it("navigate to hire employee", () => {
    fireEvent.click(screen.getByTestId("dash-hireEmployee-button"));
    expect(screen.getByTestId("addEmployee-route")).toBeInTheDocument();
  });

  it("navigate to employees", () => {
    fireEvent.click(screen.getByTestId("dash-employees-button"));
    expect(screen.getByTestId("employees-route")).toBeInTheDocument();
  });
  it("navigate to add manager", () => {
    fireEvent.click(screen.getByTestId("dash-addManager-button"));
    expect(screen.getByTestId("addManager-route")).toBeInTheDocument();
  });

  it("navigate to my Account (im employee)", () => {
    mainStore.getState().setMainAccount({ type: "employee" });
    waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-myAccount-employee-button"))
    );
    waitFor(() =>
      expect(screen.getByTestId("employeesID-route")).toBeInTheDocument()
    );
  });

  it("navigate to add customer", () => {
    fireEvent.click(screen.getByTestId("dash-addCustomer-button"));
    expect(screen.getByTestId("addCustomer-route")).toBeInTheDocument();
  });

  it("navigate to customers", () => {
    fireEvent.click(screen.getByTestId("dash-customers-button"));
    expect(screen.getByTestId("customers-route")).toBeInTheDocument();
  });

  it("navigate to make Transaction", () => {
    fireEvent.click(screen.getByTestId("dash-makeTransaction-button"));
    expect(screen.getByTestId("makeTransaction-route")).toBeInTheDocument();
  });

  it("navigate to login with log out", () => {
    fireEvent.click(screen.getByTestId("dash-logout-button"));
    expect(screen.getByTestId("login-route")).toBeInTheDocument();
  });
});
