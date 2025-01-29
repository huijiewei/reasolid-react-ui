import { FloatingPortal, type FloatingPortalProps } from "@floating-ui/react";

export type PortalProps = FloatingPortalProps;

export const Portal = (props: PortalProps) => {
  return <FloatingPortal {...props} />;
};
