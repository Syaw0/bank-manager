import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import accessibility from "./metaData";

const initialState = mainStore.getState();

describe("Dashboard Accessibility", () => {
  // accessibility are define by super user and some of these limiting in client
  // and rest of them in server...
  // client just restrict showing items that are not allowed and some access
  // in another page like block account or change accessability
  // but server does not render these routs!
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

  it("user is a manger and have all access", () => {
    waitFor(() =>
      mainStore.getState().setMainAccount({ accessibility: accessibility })
    );
    waitFor(() =>
      expect(
        screen.getByTestId("dash-myAccount-manager-button")
      ).toBeInTheDocument()
    );
    expect(screen.getByTestId("dash-hireEmployee-button")).toBeInTheDocument();
    expect(screen.getByTestId("dash-employees-button")).toBeInTheDocument();
    expect(screen.getByTestId("dash-managers-button")).toBeInTheDocument();
    expect(screen.getByTestId("dash-addManager-button")).toBeInTheDocument();

    let employeeAccount;
    try {
      employeeAccount = screen.getByTestId("dash-myAccount-employee-button");
      // user must be one of type : manager or employee
    } catch (err) {}
    expect(employeeAccount).toBeUndefined();

    expect(screen.getByTestId("dash-addCustomer-button")).toBeInTheDocument();
    expect(screen.getByTestId("dash-customers-button")).toBeInTheDocument();
    expect(
      screen.getByTestId("dash-makeTransaction-button")
    ).toBeInTheDocument();
  });

  it("user is a manger but can have not add manager Access", () => {
    const addManagerBtn = screen.getByTestId("dash-addManager-button") as any;
    expect(addManagerBtn).toBeInTheDocument();

    mainStore.getState().setMainAccount({
      accessibility: accessibility.filter((v) => v !== "Add Manager"),
    });
    waitFor(() => expect(addManagerBtn).not.toBeInTheDocument());
  });

  it("user is a employee", () => {
    const addManagerBtn = screen.getByTestId("dash-addManager-button") as any;
    expect(addManagerBtn).toBeInTheDocument();
    mainStore.getState().setMainAccount({
      accessibility: ["Add Customer", "Make Transaction"],
      type: "employee",
    });
    waitFor(() => expect(addManagerBtn).not.toBeInTheDocument());
    expect(screen.getByTestId("dash-addCustomer-button")).toBeInTheDocument();
    expect(screen.getByTestId("dash-customers-button")).toBeInTheDocument();
  });
});
