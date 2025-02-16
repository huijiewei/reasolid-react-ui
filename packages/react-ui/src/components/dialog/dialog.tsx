import type { ComponentProps } from "react";
import { PopperBackdrop } from "../popper/popper-backdrop";
import { PopperClose } from "../popper/popper-close";
import { PopperDescrition } from "../popper/popper-description";
import { PopperPortal } from "../popper/popper-portal";
import { PopperTitle } from "../popper/popper-title";
import { PopperTrigger } from "../popper/popper-trigger";
import { DialogRoot, type DialogRootProps } from "./dialog-root";

export type DialogProps = DialogRootProps;

export const Dialog = DialogRoot;

export const DialogTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
  return <PopperTrigger active={false} {...props} />;
};

export const DialogPortal = PopperPortal;

export const DialogBackdrop = PopperBackdrop;

export { DialogContent } from "./dialog-content";

export const DialogTitle = PopperTitle;
export const DialogDescription = PopperDescrition;

export const DialogClose = PopperClose;
