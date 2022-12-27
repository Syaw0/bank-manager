import React from "react";
import App from "../../../App";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mainStore from "../../../store/mainStore";
import register from "../../../utility/dashboard/hireOrRegister";

jest.mock("../../../utility/dashboard/hireOrRegister");

const mockRegister = register as jest.Mock;

const initState = mainStore.getState();

describe("Register Account inputs Tests", () => {
  beforeEach(() => {
    mainStore.setState(initState, true);
  });

  it("if any inputs are empty error msg show up", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addCustomer"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("dash-add-submit"));
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("if inputs are filled when press submit inputs locked", () => {
    mockRegister.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "ok" }))
    );

    render(
      <MemoryRouter initialEntries={["/dash/addCustomer"]}>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("dash-add-name"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-familyName"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-cardId"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-telNumber"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-initValue"), {
      target: { value: "bela" },
    });
    fireEvent.click(screen.getByTestId("dash-add-submit"));
    expect(screen.getByTestId("wait-message")).toBeInTheDocument();
    waitFor(() =>
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    );
  });

  it("if server return false show error message", () => {
    mockRegister.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "ok" }))
    );

    render(
      <MemoryRouter initialEntries={["/dash/addCustomer"]}>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("dash-add-name"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-familyName"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-cardId"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-telNumber"), {
      target: { value: "bela" },
    });
    fireEvent.change(screen.getByTestId("dash-add-initValue"), {
      target: { value: "bela" },
    });
    fireEvent.click(screen.getByTestId("dash-add-submit"));
    expect(screen.getByTestId("wait-message")).toBeInTheDocument();
    waitFor(() =>
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    );
  });

  it("in addCustomer we dont have access select input", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addCustomer"]}>
        <App />
      </MemoryRouter>
    );
    let select;
    try {
      select = screen.getByTestId("dash-add-select");
    } catch (err) {}
    expect(select).toBeUndefined();
    expect(screen.getByTestId("dash-add-initValue")).toBeInTheDocument();
  });

  it("in addManager we dont have initValue input", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addManager"]}>
        <App />
      </MemoryRouter>
    );
    let initValue;
    try {
      initValue = screen.getByTestId("dash-add-initValue");
    } catch (err) {}
    expect(initValue).toBeUndefined();
    expect(screen.getByTestId("dash-add-select")).toBeInTheDocument();
  });

  it("in addEmployee we dont have initValue input", () => {
    render(
      <MemoryRouter initialEntries={["/dash/addEmployee"]}>
        <App />
      </MemoryRouter>
    );
    let initValue;
    try {
      initValue = screen.getByTestId("dash-add-initValue");
    } catch (err) {}
    expect(initValue).toBeUndefined();
    expect(screen.getByTestId("dash-add-select")).toBeInTheDocument();
  });
});
