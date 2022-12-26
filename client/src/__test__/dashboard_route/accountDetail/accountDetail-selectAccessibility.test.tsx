import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import changeAccessibility from "../../../utility/dashboard/changeAccessibility";
jest.mock("../../../utility/dashboard/changeAccessibility");
const mockChangeAccessibility = changeAccessibility as jest.Mock;

const initialState = mainStore.getState();

describe("Select Accessibility Component", () => {
  beforeEach(() => {
    mainStore.setState(initialState, true);
    render(
      <MemoryRouter initialEntries={["/dash/employees/1"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("opening component", () => {
    fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
    expect(
      screen.getByTestId("dash-account-select-holder")
    ).toBeInTheDocument();
  });

  it("closing with cancel ", () => {
    fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
    const selectHolder = screen.getByTestId("dash-account-select-holder");
    expect(selectHolder).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dash-account-select-cancel-btn"));
    expect(selectHolder).not.toBeInTheDocument();
  });

  it("save and get true result ", () => {
    mockChangeAccessibility.mockReturnValueOnce(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
    const selectHolder = screen.getByTestId("dash-account-select-holder");
    expect(selectHolder).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dash-account-select-save-btn"));
    waitFor(() =>
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    );
  });

  it("save and get falsy result ", () => {
    mockChangeAccessibility.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
    const selectHolder = screen.getByTestId("dash-account-select-holder");
    expect(selectHolder).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("dash-account-select-save-btn"));
    waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
  });
});