import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import blockAccount from "../../../utility/dashboard/blockAccount";
import unBlockAccount from "../../../utility/dashboard/unBlockAccount";

import getSpecificUser from "../../../utility/dashboard/getSpecificUser";
import { randomEmployee } from "../../../sharedData/fakeUsers";

jest.mock("../../../utility/dashboard/getSpecificUser");
jest.mock("../../../utility/dashboard/blockAccount");
jest.mock("../../../utility/dashboard/unBlockAccount");

const mockBlockAccount = blockAccount as jest.Mock;
const mockUnBlockAccount = unBlockAccount as jest.Mock;
const mockGetSpecificUser = getSpecificUser as jest.Mock;

mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomEmployee });
  })
);

mockUnBlockAccount.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "" });
  })
);

const initialState = mainStore.getState();

describe("blocking process", () => {
  beforeEach(async () => {
    mainStore.setState(initialState, true);
    await waitFor(() => {
      render(
        <MemoryRouter initialEntries={["/dash/employees/1"]}>
          <App />
        </MemoryRouter>
      );
    });
  });

  it("if customer or employee was not blocked show block", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("dash-account-block-button")).toHaveTextContent(
        "Block Account"
      )
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

  it("blocking or unBlocking will successfully with message ", async () => {
    mockBlockAccount.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-account-block-button"))
    );
    await waitFor(() => {
      expect(screen.getByTestId("success-message")).toBeInTheDocument();
    });
  });

  it("blocking or unBlocking will throw error with message ", async () => {
    mockBlockAccount.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-account-block-button"))
    );
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});
