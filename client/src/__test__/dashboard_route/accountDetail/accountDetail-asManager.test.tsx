import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import { randomEmployee, randomManager } from "../../../sharedData/fakeUsers";

import getSpecificUser from "../../../utility/dashboard/getSpecificUser";

jest.mock("../../../utility/dashboard/getSpecificUser");

const mockGetSpecificUser = getSpecificUser as jest.Mock;

mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomManager });
  })
);

const initialState = mainStore.getState();

describe("login as manager and See Account Detail", () => {
  beforeEach(() => {
    mainStore.setState(initialState, true);
  });

  it("if user see own account ", async () => {
    await waitFor(() => {
      mainStore.getState().setMainAccount(randomManager);
      render(
        <MemoryRouter initialEntries={["/dash/managers/1"]}>
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
  });

  it("manager see an simple employee ", async () => {
    mockGetSpecificUser.mockReturnValue(
      new Promise((res) => {
        return res({ status: true, msg: "", data: randomEmployee });
      })
    );

    await waitFor(() => {
      mainStore.getState().setMainAccount(randomManager);
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
      expect(blockBtn).toBeInTheDocument();
      expect(changAccessBtn).toBeInTheDocument();
      expect(balance).toBeUndefined();
      expect(
        screen.getByTestId("dash-account-li-Add Customer")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("dash-account-li-Make Transaction")
      ).toBeInTheDocument();
    });
  });

  it("manager has not change access and block ", async () => {
    await waitFor(() => {
      mainStore.getState().setMainAccount(randomManager);
      mainStore.getState().setMainAccount({ accessibility: [""] });
      render(
        <MemoryRouter initialEntries={["/dash/employees/1"]}>
          <App />
        </MemoryRouter>
      );
      let blockBtn: any, changAccessBtn: any, balance: any;
      try {
        blockBtn = screen.getByTestId("dash-account-block-button");
        changAccessBtn = screen.getByTestId("dash-account-changeAccess-button");
      } catch (err) {}
      expect(blockBtn).toBeUndefined();
      expect(changAccessBtn).toBeUndefined();
    });
  });
});
