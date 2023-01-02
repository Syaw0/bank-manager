import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import {
  employeeList,
  randomEmployee,
  randomManager,
} from "../../../sharedData/fakeUsers";
import getUserListData from "../../../utility/dashboard/getUserListData";
import search from "../../../utility/dashboard/search";
import whoami from "../../../utility/dashboard/whoami";

jest.mock("../../../utility/dashboard/whoami");
jest.mock("../../../utility/dashboard/search");
jest.mock("../../../utility/dashboard/getUserListData");

const mockGetUserListData = getUserListData as jest.Mock;
const mockSearch = search as jest.Mock;
const mockWhoami = whoami as jest.Mock;

mockGetUserListData.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: employeeList });
  })
);

mockWhoami.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomManager });
  })
);
mockSearch.mockResolvedValue(
  new Promise((res) =>
    res({
      status: true,
      msg: "",
      data: [randomEmployee, randomEmployee, randomEmployee, randomEmployee],
    })
  )
);
const initValue = mainStore.getState();

describe("user List Search Input test", () => {
  beforeEach(async () => {
    mainStore.setState(initValue, true);
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/employees"]}>
          <App />
        </MemoryRouter>
      )
    );
  });

  it("write on search and press Enter", async () => {
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-list-search"), {
        target: { value: "bela bela" },
      })
    );
    fireEvent.keyDown(screen.getByTestId("dash-list-search"), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(screen.getByTestId("dash-listUser-loader")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByTestId("table-row").length).toBe(4);
    });
  });

  it("if server return false show error", async () => {
    mockSearch.mockResolvedValue(
      new Promise((res) =>
        res({
          status: false,
          msg: "",
        })
      )
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-list-search"), {
        target: { value: "bela bela" },
      })
    );
    fireEvent.keyDown(screen.getByTestId("dash-list-search"), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(screen.getByTestId("dash-listUser-loader")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});
