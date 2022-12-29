import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useParams } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import { employeeList, randomEmployee } from "../../../sharedData/fakeUsers";
import getUserListData from "../../../utility/dashboard/getUserListData";

jest.mock("../../../utility/dashboard/getUserListData");

const mockGetUserListData = getUserListData as jest.Mock;

// mockGetUserListData.mockReturnValue(
//   new Promise((res) => {
//     return res({ status: true, msg: "", data: employeeList });
//   })
// );

const initValue = mainStore.getState();

describe("user List Search Input test", () => {
  beforeEach(async () => {
    mainStore.setState(initValue, true);
  });
  it("lets render employees component with 2 user", async () => {
    mockGetUserListData.mockReturnValue(
      new Promise((res) => {
        return res({
          status: true,
          msg: "",
          data: [randomEmployee, randomEmployee],
        });
      })
    );
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/employees"]}>
          <App />
        </MemoryRouter>
      )
    );

    await waitFor(() =>
      expect(screen.getAllByTestId("table-row").length).toBe(2)
    );
  });

  it("click on the on item in list", async () => {
    mockGetUserListData.mockReturnValue(
      new Promise((res) => {
        return res({
          status: true,
          msg: "",
          data: [randomEmployee],
        });
      })
    );
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/employees"]}>
          <App />
        </MemoryRouter>
      )
    );

    await waitFor(() => fireEvent.click(screen.getByTestId("table-row")));
    await waitFor(() =>
      expect(screen.getByTestId("employeesID-route")).toBeInTheDocument()
    );
  });
});
