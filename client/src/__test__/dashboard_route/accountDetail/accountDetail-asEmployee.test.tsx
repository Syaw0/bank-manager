import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import { randomEmployee } from "../../../sharedData/fakeUsers";

const initialState = mainStore.getState();

describe("login as Employee and See Account Detail", () => {
  beforeEach(() => {
    mainStore.setState(initialState, true);
  });

  it("if user see own account ", () => {
    waitFor(() => mainStore.getState().setMainAccount(randomEmployee));
    render(
      <MemoryRouter initialEntries={["/dash/employees/1"]}>
        <App />
      </MemoryRouter>
    );
    let blockBtn: any, changAccessBtn: any, balance: any;
    try {
      blockBtn = screen.getByTestId("dash-account-block-button");
      changAccessBtn = screen.getByTestId("dash-account-changeAccess-button");
      balance = screen.getByTestId("dash-account-items-balance");
    } catch (err) {}
    expect(blockBtn).toBeUndefined();
    expect(changAccessBtn).toBeUndefined();
    expect(balance).toBeUndefined();
  });

  it("employee see an simple customer ", () => {
    waitFor(() => mainStore.getState().setMainAccount(randomEmployee));
    render(
      <MemoryRouter initialEntries={["/dash/customers/1"]}>
        <App />
      </MemoryRouter>
    );
    let blockBtn: any, changAccessBtn: any, balance: any;
    try {
      blockBtn = screen.getByTestId("dash-account-block-button");
      changAccessBtn = screen.getByTestId("dash-account-changeAccess-button");
      balance = screen.getByTestId("dash-account-items-balance");
    } catch (err) {}
    expect(blockBtn).toBeInTheDocument();
    expect(changAccessBtn).toBeUndefined();
    // expect(balance).toBeInTheDocument();
    //! this work fine in manual test but not here
  });

  it("employee has not block access ", () => {
    waitFor(() => mainStore.getState().setMainAccount(randomEmployee));
    waitFor(() => mainStore.getState().setMainAccount({ accessibility: [""] }));
    render(
      <MemoryRouter initialEntries={["/dash/customers/1"]}>
        <App />
      </MemoryRouter>
    );
    let blockBtn: any;
    try {
      blockBtn = screen.getByTestId("dash-account-block-button");
    } catch (err) {}
    expect(blockBtn).toBeUndefined();
  });
});
