import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from '@/components/ProductsList';

test("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });