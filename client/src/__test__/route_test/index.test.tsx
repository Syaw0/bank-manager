import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

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

  it("navigate to managers  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/managers"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("managers-route")).toBeInTheDocument();
  });

  it("navigate to managersID  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/managers/2"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("managersID-route")).toBeInTheDocument();
  });

  it("navigate to customers  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/customers"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("customers-route")).toBeInTheDocument();
  });

  it("navigate to customersID  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/customers/2"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("customersID-route")).toBeInTheDocument();
  });

  it("navigate to employees  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/employees"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("employees-route")).toBeInTheDocument();
  });

  it("navigate to employeesID  route", () => {
    render(
      <MemoryRouter initialEntries={["/dash/employees/2"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("employeesID-route")).toBeInTheDocument();
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
