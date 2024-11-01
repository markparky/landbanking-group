import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "./Header";

describe('Header tests', () => {
  test("demo", () => {
    expect(true).toBe(true);
  });

  test("Renders the main page", () => {
    render(<Header />);
    expect(true).toBeTruthy();
  });
});
