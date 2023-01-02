import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import { randomEmployee, randomManager } from "../../../sharedData/fakeUsers";

import getSpecificUser from "../../../utility/dashboard/getSpecificUser";
import whoami from "../../../utility/dashboard/whoami";

jest.mock("../../../utility/dashboard/whoami");
jest.mock("../../../utility/dashboard/getSpecificUser");

const mockGetSpecificUser = getSpecificUser as jest.Mock;
const mockWhoami = whoami as jest.Mock;

mockWhoami.mockReturnValue(
  new Promise((res) => res({ status: true, msg: "", data: randomManager }))
);
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
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/managers/1"]}>
          <App />
        </MemoryRouter>
      )
    );
    await waitFor(() => {
      // mainStore.getState().setMainAccount(randomManager);
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

    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/employees/1"]}>
          <App />
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      let balance: any;
      try {
        balance = screen.getByTestId("dash-account-items-balance");
      } catch (err) {}

      expect(balance).toBeUndefined();
      expect(
        screen.getByTestId("dash-account-block-button")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("dash-account-changeAccess-button")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("dash-account-li-AddCustomer")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("dash-account-li-MakeTransaction")
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
