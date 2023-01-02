import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import performTransaction from "../../../utility/dashboard/performTransaction";
import whoami from "../../../utility/dashboard/whoami";
import { randomManager } from "../../../sharedData/fakeUsers";
jest.mock("../../../utility/dashboard/whoami");
jest.mock("../../../utility/dashboard/performTransaction");

const mockPerformTransaction = performTransaction as jest.Mock;
const mockWhoami = whoami as jest.Mock;

mockWhoami.mockReturnValue(
  new Promise((res) => res({ status: true, msg: "", data: randomManager }))
);
const initState = mainStore.getState();

mockPerformTransaction.mockReturnValue(
  new Promise((res) => res({ status: true, msg: "bela" }))
);

describe("lets make Transaction", () => {
  beforeEach(async () => {
    mainStore.setState(initState, true);
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/makeTransaction"]}>
          <App />
        </MemoryRouter>
      )
    );
  });

  it("if any inputs be an empty error message show up", async () => {
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"))
    );
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
});

describe("fill inputs", () => {
  beforeEach(async () => {
    mainStore.setState(initState, true);
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={["/dash/makeTransaction"]}>
          <App />
        </MemoryRouter>
      )
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-makeTransaction-oId"), {
        target: { value: 2 },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-makeTransaction-dId"), {
        target: { value: 1 },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-makeTransaction-amount"), {
        target: { value: 11 },
      })
    );
  });

  it("if inputs are valid lets first wait for operation if all its ok success msg show up", async () => {
    const x: any = screen.getByTestId("dash-makeTransaction-oId");

    if (x.value != "") {
      await waitFor(() =>
        fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"))
      );
      await waitFor(() =>
        expect(screen.getByTestId("wait-message")).toBeInTheDocument()
      );
      await waitFor(() =>
        expect(screen.getByTestId("success-message")).toBeInTheDocument()
      );
    }
  });

  it("if origin and destination is same show error", async () => {
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("dash-makeTransaction-oId"), {
        target: { value: 1 },
      })
    );

    await waitFor(() =>
      fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"))
    );

    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
  });

  it("if inputs are valid but server return false...", async () => {
    mockPerformTransaction.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "bela" }))
    );
    fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"));
    expect(screen.getByTestId("wait-message")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
  });

  it("if operation was successfully show success msg and wip formData", async () => {
    mockPerformTransaction.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "bela" }))
    );
    fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"));
    expect(screen.getByTestId("wait-message")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    );
    const originAcc: any = screen.getByTestId("dash-makeTransaction-oId");
    const distAcc: any = screen.getByTestId("dash-makeTransaction-oId");
    const amountAcc: any = screen.getByTestId("dash-makeTransaction-oId");
    await waitFor(() => expect(originAcc.value).toBe(""));
    await waitFor(() => expect(distAcc.value).toBe(""));
    await waitFor(() => expect(amountAcc.value).toBe(""));
  });
});
