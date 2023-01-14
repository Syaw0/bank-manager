import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useParams } from "react-router-dom";
import App from "../../../App";
import mainStore from "../../../store/mainStore";
import {
  employeeList,
  randomEmployee,
  randomManager,
} from "../../../sharedData/fakeUsers";
import getUserListData from "../../../utility/dashboard/getUserListData";
import whoami from "../../../utility/dashboard/whoami";
import getSpecificUser from "../../../utility/dashboard/getSpecificUser";

jest.mock("../../../utility/dashboard/whoami");
jest.mock("../../../utility/dashboard/getSpecificUser");
// TODO why i just mock useFetch??instead of these
// ! if we do this we need to implement every of fetch in mockReturnOnce
jest.mock("../../../utility/dashboard/getUserListData");

const mockGetSpecificUser = getSpecificUser as jest.Mock;
const mockWhoami = whoami as jest.Mock;
const mockGetUserListData = getUserListData as jest.Mock;

mockWhoami.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomManager });
  })
);

mockGetSpecificUser.mockReturnValue(
  new Promise((res) => {
    return res({ status: true, msg: "", data: randomEmployee });
  })
);

mockGetUserListData.mockReturnValue(
  new Promise((res) => {
    return res({
      status: true,
      msg: "",
      data: [randomEmployee, randomEmployee],
    });
  })
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
  it.only("lets render employees component with 2 user", async () => {
    await waitFor(() =>
      expect(screen.getAllByTestId("table-row")[0]).toBeInTheDocument()
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

    await waitFor(() => fireEvent.click(screen.getByTestId("table-row")));
    await waitFor(() =>
      expect(screen.getByTestId("employeesID-route")).toBeInTheDocument()
    );
  });
});
