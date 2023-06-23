import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../App";
// import { ProtectedRoutes } from "../PrivateRoute";
// import { BrowserRouter } from "react-router-dom";

test("Expects a container div wrapping the content", () => {
  render(<App />);

  const divContainer = screen.getByTestId("content");
  expect(divContainer).toBeInTheDocument();
});
