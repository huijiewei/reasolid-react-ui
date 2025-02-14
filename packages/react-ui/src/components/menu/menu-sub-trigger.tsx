import type { ComponentProps } from "react";
import { useMergeRefs } from "../../hooks";
import type { HtmlProps, PolymorphicProps } from "../../primitives";
import { AngleRightIcon } from "../../shared/icons";
import { dataAttr, tx } from "../../utils";
import { usePopperReference } from "../popper/popper-reference-context";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuHover } from "./menu-hover-context";

export type MenuSubTriggerProps = MenuBaseItemProps;

type MenuSubTriggerHtmlProps = HtmlProps<"div", MenuSubTriggerProps, "role" | "tabIndex">;

export const MenuSubTrigger = (props: PolymorphicProps<MenuSubTriggerHtmlProps, MenuSubTriggerProps>) => {
  const { render, children, ref, className, disabled, ...rest } = props;

  const { open, setReference, getReferenceProps } = usePopperReference();
  const { setHoverEnabled } = useMenuHover();

  const refs = useMergeRefs(ref, setReference);

  return (
    <MenuBaseItem
      render={render}
      ref={refs}
      data-open={dataAttr(open)}
      className={tx("open:not-active:bg-bg-subtlest justify-between pe-0.5", className)}
      {...(getReferenceProps({
        ...rest,
        onMouseEnter: () => {
          setHoverEnabled(true);
        },
      }) as ComponentProps<typeof MenuBaseItem>)}
    >
      {children}
      <span className={tx("ms-5", disabled ? "text-fg-subtle" : "text-fg-muted")}>
        <AngleRightIcon />
      </span>
    </MenuBaseItem>
  );
};
