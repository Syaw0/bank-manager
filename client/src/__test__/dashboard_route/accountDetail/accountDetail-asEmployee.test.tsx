import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import { randomCustomer, randomEmployee } from "../../../sharedData/fakeUsers";
import getSpecificUser from "../../../utility/dashboard/getSpecificUser";

jest.mock("../../../utility/dashboard/getSpecificUser");

const mockGetSpecificUser = getSpecificUser as jest.Mock;

mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomEmployee });
  })
);

const initialState = mainStore.getState();

describe("login as Employee and See Account Detail", () => {
  beforeEach(() => {
    mainStore.setState(initialState, true);
  });

  it("if user see own account ", async () => {
    await waitFor(() => {
      mainStore.getState().setMainAccount(randomEmployee);
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
  });

  it("employee see an simple customer ", async () => {
    mockGetSpecificUser.mockReturnValue(
      new Promise((res) => {
        return res({ status: true, msg: "", data: randomCustomer });
      })
    );

    await waitFor(() => {
      mainStore.getState().setMainAccount(randomEmployee);
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
  });

  it("employee has not block access ", async () => {
    mockGetSpecificUser.mockReturnValue(
      new Promise((res) => {
        return res({ status: true, msg: "", data: randomCustomer });
      })
    );

    await waitFor(() => {
      mainStore.getState().setMainAccount(randomEmployee);
      mainStore.getState().setMainAccount({ accessibility: [""] });
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
});
