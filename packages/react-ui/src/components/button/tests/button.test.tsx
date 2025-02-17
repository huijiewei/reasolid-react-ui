import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have attribute 'type=button' by default", () => {
    const { getByTestId } = render(<Button data-testid="button">Button</Button>);

    const button = getByTestId("button");

    expect(button).toHaveAttribute("type", "button");
  });

  test("should not have attribute 'type=button' by default when it's not a 'button' tag", () => {
    const { getByTestId } = render(
      <Button data-testid="button" render={(props) => <div {...props} />}>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).not.toHaveAttribute("type", "button");
  });

  test("should not have attribute 'role=button' when it's a native button", () => {
    const { getByTestId } = render(<Button data-testid="button">Button</Button>);

    const button = getByTestId("button");

    expect(button).not.toHaveAttribute("role", "button");
  });

  test("should have attribute 'role=button' when it's not a native button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" render={(props) => <div {...props} />}>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).toHaveAttribute("role", "button");
  });

  test("should have attribute 'role=button' when it's an 'a' tag without 'href'", () => {
    const { getByTestId } = render(<Button data-testid="button" render={(props) => <a {...props}>Button</a>} />);

    const button = getByTestId("button");

    expect(button).toHaveAttribute("role", "button");
  });

  test("should have attribute 'tabindex=0' when it's not a native button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" render={(props) => <div {...props} />}>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).toHaveAttribute("tabindex", "0");
  });

  test("should not have attribute 'tabindex=0' when it's disabled", () => {
    const { getByTestId } = render(
      <Button data-testid="button" disabled render={(props) => <div {...props} />}>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).not.toHaveAttribute("tabindex", "0");
  });

  test("should have correct 'disabled' attribute when disabled and it's a native button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" disabled>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).toHaveAttribute("disabled");
    expect(button).not.toHaveAttribute("aria-disabled");
  });

  test("should have correct 'disabled' attribute when disabled and it's not a native button nor input", () => {
    const { getByTestId } = render(
      <Button data-testid="button" disabled render={(props) => <div {...props} />}>
        Button
      </Button>,
    );

    const button = getByTestId("button");

    expect(button).not.toHaveAttribute("disabled");
    expect(button).toHaveAttribute("aria-disabled");
  });
});
