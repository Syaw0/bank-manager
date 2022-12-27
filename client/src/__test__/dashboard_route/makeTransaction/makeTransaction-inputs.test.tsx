import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import performTransaction from "../../../utility/dashboard/performTransaction";

jest.mock("../../../utility/dashboard/performTransaction");

const mockPerformTransaction = performTransaction as jest.Mock;
const initState = mainStore.getState();

describe("lets make Transaction", () => {
  beforeEach(() => {
    mainStore.setState(initState, true);
    render(
      <MemoryRouter initialEntries={["/dash/makeTransaction"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("if any inputs be an empty error message show up", () => {
    fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"));
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  describe("fill inputs", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("dash-makeTransaction-oId"), {
        target: { value: "bela" },
      });
      fireEvent.change(screen.getByTestId("dash-makeTransaction-dId"), {
        target: { value: "bela" },
      });
      fireEvent.change(screen.getByTestId("dash-makeTransaction-amount"), {
        target: { value: "bela" },
      });
    });

    it("if inputs are valid lets first wait for operation if all its ok success msg show up", () => {
      mockPerformTransaction.mockReturnValue(
        new Promise((res) => res({ status: true, msg: "bela" }))
      );
      fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"));
      expect(screen.getByTestId("wait-message")).toBeInTheDocument();
      waitFor(() =>
        expect(screen.getByTestId("success-message")).toBeInTheDocument()
      );
    });
    it("if inputs are valid but server return false...", () => {
      mockPerformTransaction.mockReturnValue(
        new Promise((res) => res({ status: false, msg: "bela" }))
      );
      fireEvent.click(screen.getByTestId("dash-makeTransaction-submit"));
      expect(screen.getByTestId("wait-message")).toBeInTheDocument();
      waitFor(() =>
        expect(screen.getByTestId("error-message")).toBeInTheDocument()
      );
    });
  });
});
