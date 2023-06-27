import { render, screen } from "@testing-library/react";
import { SideBar } from "../../containers/layout/sideBar/SideBar";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("SideBar Compoent", () => {
  test("It must initiliaze with BIX DASHBOARD text", () => {
    render(<SideBar />, { wrapper: BrowserRouter });

    const title = screen.getByText("BIX DASHBOARD");
    expect(title).toBeInTheDocument();
  });

  test("Expect div sidebar to be on document", () => {
    render(<SideBar />, { wrapper: BrowserRouter });

    const divSideBar = screen.getByTestId("div-sidebar");
    expect(divSideBar).toBeInTheDocument();
  });
});
