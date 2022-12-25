import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import loginPhase from "../../utility/login/loginPhase";

jest.mock("../../utility/login/loginPhase.ts");
const loginPhaseMock = loginPhase as jest.Mock;

describe("login route --> pressing login button...", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
  });

  describe("inputs are empty", () => {
    it("show error if both are empty", () => {
      fireEvent.click(screen.getByTestId("login-button"));
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
    it("show error if even on of them are empty", () => {
      fireEvent.change(screen.getByTestId("login-password-input"), {
        value: "bela bela",
      });
      fireEvent.click(screen.getByTestId("login-button"));
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });

  describe("inputs are not empty ...", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("login-password-input"), {
        target: { value: "bela bela" },
      });
      fireEvent.change(screen.getByTestId("login-username-input"), {
        target: { value: "bela bela" },
      });
    });
    it("if user and password is correct", async () => {
      loginPhaseMock.mockReturnValueOnce(
        new Promise((res) => {
          res({ statue: true, msg: "its ok" });
        })
      );
      fireEvent.click(screen.getByTestId("login-button"));
      waitFor(() => screen.getByTestId("success-message"));
    });

    it("if user and password is NOT correct", async () => {
      loginPhaseMock.mockReturnValueOnce(
        new Promise((res) => {
          res({ statue: false, msg: "its not ok" });
        })
      );
      fireEvent.click(screen.getByTestId("login-button"));
      waitFor(() => screen.getByTestId("error-message"));
    });
  });
});
