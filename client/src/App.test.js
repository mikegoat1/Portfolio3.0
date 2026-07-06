import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./theme";

beforeAll(() => {
  window.HTMLElement.prototype.scrollTo = jest.fn();
});

test("renders the home page", () => {
  render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

  expect(screen.getByRole("link", { name: /view work/i })).toBeInTheDocument();
});
