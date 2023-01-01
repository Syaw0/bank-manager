import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import accessibility from "./metaData";
import getUserListData from "../../../utility/dashboard/getUserListData";
import getSpecificUser from "../../../utility/dashboard/getSpecificUser";
import {
  customerList,
  employeeList,
  randomEmployee,
  randomManager,
} from "../../../sharedData/fakeUsers";

jest.mock("../../../utility/dashboard/getUserListData");
jest.mock("../../../utility/dashboard/getSpecificUser");

const mockGetUserListData = getUserListData as jest.Mock;
const mockGetSpecificUser = getSpecificUser as jest.Mock;

const initialState = mainStore.getState();

describe("dashboard navigation", () => {
  beforeEach(async () => {
    mainStore.setState(initialState, true);
    await waitFor(() => {
      render(
        <MemoryRouter initialEntries={["/dash"]}>
          <App />
        </MemoryRouter>
      );
    });
  });
  it("navigate to my account page(im manager)", async () => {
    mockGetSpecificUser.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: randomManager }))
    );
    fireEvent.click(screen.getByTestId("dash-myAccount-manager-button"));

    await waitFor(() =>
      expect(screen.getByTestId("managersID-route")).toBeInTheDocument()
    );
  });

  it("navigate to hire employee", () => {
    fireEvent.click(screen.getByTestId("dash-hireEmployee-button"));
    expect(screen.getByTestId("addEmployee-route")).toBeInTheDocument();
  });

  it("navigate to employees", async () => {
    mockGetUserListData.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: employeeList }))
    );
    fireEvent.click(screen.getByTestId("dash-employees-button"));

    await waitFor(() =>
      expect(screen.getByTestId("employees-route")).toBeInTheDocument()
    );
  });
  it("navigate to add manager", () => {
    fireEvent.click(screen.getByTestId("dash-addManager-button"));
    expect(screen.getByTestId("addManager-route")).toBeInTheDocument();
  });

  it("navigate to my Account (im employee)", async () => {
    mockGetSpecificUser.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: randomEmployee }))
    );

    await waitFor(() =>
      mainStore.getState().setMainAccount({ type: "employee" })
    );

    fireEvent.click(screen.getByTestId("dash-myAccount-employee-button"));

    await waitFor(() =>
      expect(screen.getByTestId("employeesID-route")).toBeInTheDocument()
    );
  });

  it("navigate to add customer", () => {
    fireEvent.click(screen.getByTestId("dash-addCustomer-button"));
    expect(screen.getByTestId("addCustomer-route")).toBeInTheDocument();
  });

  it("navigate to customers", async () => {
    mockGetUserListData.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: customerList }))
    );

    fireEvent.click(screen.getByTestId("dash-customers-button"));
    await waitFor(() =>
      expect(screen.getByTestId("customers-route")).toBeInTheDocument()
    );
  });

  it("navigate to make Transaction", () => {
    fireEvent.click(screen.getByTestId("dash-makeTransaction-button"));
    expect(screen.getByTestId("makeTransaction-route")).toBeInTheDocument();
  });

  // ? this commonly handle by server as in this case request for wip
  // ? session key send by client and if session removed successfully
  // ? server respond with redirect !

  // it("navigate to login with log out", () => {
  //   fireEvent.click(screen.getByTestId("dash-logout-button"));
  //   expect(screen.getByTestId("login-route")).toBeInTheDocument();
  // });
});
