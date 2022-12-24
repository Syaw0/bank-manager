import App from "../App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-environment-jsdom";

it("app render correctly", () => {
  render(<App />);
  expect(screen.getByTestId("holder")).toBeInTheDocument();
});
