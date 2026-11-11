import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders a primary, medium button by default", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("button", "button--primary", "button--md");
  });

  it.each([
    "primary",
    "secondary",
    "tertiary",
    "outline",
    "ghost",
    "danger",
    "danger-soft",
  ] as const)("applies the %s variant class", (variant) => {
    render(<Button variant={variant}>Save</Button>);

    expect(screen.getByRole("button")).toHaveClass(`button--${variant}`);
  });

  it.each(["sm", "md", "lg"] as const)("applies the %s size class", (size) => {
    render(<Button size={size}>Save</Button>);

    expect(screen.getByRole("button")).toHaveClass(`button--${size}`);
  });

  it("merges a custom className", () => {
    render(<Button className="w-full">Save</Button>);

    expect(screen.getByRole("button")).toHaveClass("button", "w-full");
  });

  it("supports a className function based on render props", () => {
    render(
      <Button
        isDisabled
        className={({ isDisabled }) => (isDisabled ? "is-off" : "")}
      >
        Save
      </Button>,
    );

    expect(screen.getByRole("button")).toHaveClass("button", "is-off");
  });

  it("calls onPress when pressed", async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", async () => {
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards the ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
