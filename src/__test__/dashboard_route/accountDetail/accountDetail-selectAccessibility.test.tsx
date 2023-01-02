import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import changeAccessibility from "../../../utility/dashboard/changeAccessibility";
import getSpecificUser from "../../../utility/dashboard/getSpecificUser";
import { randomEmployee, randomManager } from "../../../sharedData/fakeUsers";
import whoami from "../../../utility/dashboard/whoami";
jest.mock("../../../utility/dashboard/whoami");
jest.mock("../../../utility/dashboard/getSpecificUser");
jest.mock("../../../utility/dashboard/changeAccessibility");

const mockGetSpecificUser = getSpecificUser as jest.Mock;
const mockChangeAccessibility = changeAccessibility as jest.Mock;
const mockWhoami = whoami as jest.Mock;

mockWhoami.mockReturnValue(
  new Promise((res) => res({ status: true, msg: "", data: randomManager }))
);
mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomEmployee });
  })
);

const initialState = mainStore.getState();

describe("Select Accessibility Component", () => {
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

  it("opening component", async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
      expect(
        screen.getByTestId("dash-account-select-holder")
      ).toBeInTheDocument();
    });
  });

  it("closing with cancel ", async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
      const selectHolder = screen.getByTestId("dash-account-select-holder");
      expect(selectHolder).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("dash-account-select-cancel-btn"));
      expect(selectHolder).not.toBeInTheDocument();
    });
  });

  it("save and get true result ", async () => {
    global.window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        reload() {
          return "reload";
        },
      },
    });

    mockChangeAccessibility.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"));
      const selectHolder = screen.getByTestId("dash-account-select-holder");
      expect(selectHolder).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("dash-account-select-save-btn"));
      waitFor(() =>
        expect(screen.getByTestId("success-message")).toBeInTheDocument()
      );
    });
  });

  it("save and get falsy result ", async () => {
    mockChangeAccessibility.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-account-changeAccess-button"))
    );

    const selectHolder = screen.getByTestId("dash-account-select-holder");
    expect(selectHolder).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("dash-account-select-save-btn"));
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});
