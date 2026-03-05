/**
 * Tests for the public homepage placeholder.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PublicHomePage from "./page";

describe("PublicHomePage", () => {
  it("renders the frozensapphire hero copy", () => {
    render(<PublicHomePage />);

    expect(
      screen.getByText(/modern CMS with WordPress-core parity/i),
    ).toBeInTheDocument();
  });
});
