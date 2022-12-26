import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import blockAccount from "../../../utility/dashboard/blockAccount";
import unBlockAccount from "../../../utility/dashboard/unBlockAccount";

jest.mock("../../../utility/dashboard/blockAccount");
jest.mock("../../../utility/dashboard/unBlockAccount");

const mockBlockAccount = blockAccount as jest.Mock;
const mockUnBlockAccount = unBlockAccount as jest.Mock;

const initialState = mainStore.getState();

describe("blocking process", () => {
  beforeEach(() => {
    mainStore.setState(initialState, true);
    render(
      <MemoryRouter initialEntries={["/dash/employees/1"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("if customer or employee was not blocked show block", () => {
    expect(screen.getByTestId("dash-account-block-button")).toHaveTextContent(
      "Block Account"
    );
  });

  // ?
  // it("if customer or employee was blocked show unBlock", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/dash/employees/1"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   mainStore.
  //   expect(screen.getByTestId("dash-account-block-button")).toHaveTextContent(
  //     "Unblock Account"
  //   );
  // });

  it("blocking or unBlocking will successfully with message ", () => {
    mockBlockAccount.mockReturnValueOnce(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("dash-account-block-button"));
    waitFor(() =>
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    );
  });

  it("blocking or unBlocking will throw error with message ", () => {
    mockBlockAccount.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("dash-account-block-button"));
    waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
  });
});
