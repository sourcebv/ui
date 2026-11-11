import type { Ref } from "react";
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { buttonVariants, type ButtonVariants } from "@sourcebv/styles";

export interface ButtonProps extends AriaButtonProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className) =>
        buttonVariants({ variant, size, className }),
      )}
    />
  );
}
