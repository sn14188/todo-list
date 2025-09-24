/**
 * ref: https://www.shadcn.io/ui/toggle
 */
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./toggle";

beforeEach(() => {
  render(<Toggle />);
});

describe("Toggle 컴포넌트 속성 테스트", () => {
  // 렌더링
  test("toggle element renders correctly", () => {
    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toBeInTheDocument();
  });

  // 속성
  test("attribute test: data-state", () => {
    const toggleElement = screen.getByRole("button");
    expect(toggleElement).toHaveAttribute("data-state");
    expect(toggleElement).toHaveAttribute("data-state", "off");
  });

  test("attribute test: data-disabled", () => {
    const toggleElement = screen.getByRole("button");
    expect(toggleElement).not.toHaveAttribute("data-disabled");
  });
});

describe("Toggle 컴포넌트 기능 테스트", () => {
  // 마우스 토글
  test("function test: click once", async () => {
    const toggleElement = screen.getByRole("button");
    await fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute("data-state", "on");
  });

  test("function test: click twice", async () => {
    const toggleElement = screen.getByRole("button");
    await fireEvent.click(toggleElement);
    await fireEvent.click(toggleElement);
    expect(toggleElement).toHaveAttribute("data-state", "off");
  });

  // 키보드 토글
  test("function test: press space key", async () => {
    const toggleElement = screen.getByRole("button");
    toggleElement.focus();
    await userEvent.keyboard("[Space]");
    expect(toggleElement).toHaveAttribute("data-state", "on");
  });

  test("function test: press enter key", async () => {
    const toggleElement = screen.getByRole("button");
    toggleElement.focus();
    await userEvent.keyboard("[Enter]");
    expect(toggleElement).toHaveAttribute("data-state", "on");
  });
});
