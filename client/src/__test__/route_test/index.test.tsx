import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import getSpecificUser from "../../utility/dashboard/getSpecificUser";
import getUserListData from "../../utility/dashboard/getUserListData";
import { customerList, randomCustomer } from "../../sharedData/fakeUsers";

jest.mock("../../utility/dashboard/getUserListData");
jest.mock("../../utility/dashboard/getSpecificUser");

const mockGetSpecificUser = getSpecificUser as jest.Mock;
const mockGetUserListData = getUserListData as jest.Mock;

mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomCustomer });
  })
);

mockGetUserListData.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: customerList });
  })
);

describe("app route test...", () => {
  it("navigate to login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("login-route")).toBeInTheDocument();
  });

  it("navigate to dashboard route", () => {
    render(
      <MemoryRouter initialEntries={["/dash"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("dashboard-route")).toBeInTheDocument();
  });

  it("navigate to managers  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/managers"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("managers-route")).toBeInTheDocument()
    );
  });

  it("navigate to managersID  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/managers/2"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("managersID-route")).toBeInTheDocument()
    );
  });

  it("navigate to customers  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/customers"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("customers-route")).toBeInTheDocument()
    );
  });

  it("navigate to customersID  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/customers/2"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("customersID-route")).toBeInTheDocument()
    );
  });

  it("navigate to employees  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/employees"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("employees-route")).toBeInTheDocument()
    );
  });

  it("navigate to employeesID  route", async () => {
    render(
      <MemoryRouter initialEntries={["/dash/employees/2"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId("employeesID-route")).toBeInTheDocument()
    );
  });

  it("navigate to makeTransaction  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/makeTransaction"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("makeTransaction-route")).toBeInTheDocument();
  });

  it("navigate to addCustomer  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addCustomer"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("addCustomer-route")).toBeInTheDocument();
  });

  it("navigate to addManager route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addManager"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("addManager-route")).toBeInTheDocument();
  });

  it("navigate to addEmployee route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addEmployee"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("addEmployee-route")).toBeInTheDocument();
  });
});
