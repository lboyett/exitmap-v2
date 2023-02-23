import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Map from "./Map";

describe("map", () => {
  it("should load when page renders", () => {
    render(<Map />);
    //const map = screen.getByTestId("google-map");
  });
});
