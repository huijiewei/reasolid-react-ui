import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { tx } from "../../utils";

export type BreadcrumbLinkProps = {
  /**
   * 面包屑链接是否代表当前页面。
   */
  current?: boolean;
};

type BreadcrumbLinkHtmlProps = HtmlProps<"a", BreadcrumbLinkProps>;

export const BreadcrumbLink = (props: PolymorphicProps<BreadcrumbLinkHtmlProps, BreadcrumbLinkProps>) => {
  const { render, children, className, href, current, ...rest } = props;

  if (current) {
    return (
      <span className={tx("text-fg-muted inline-flex items-center", className)} aria-current="page" {...rest}>
        {children}
      </span>
    );
  }

  return (
    <Polymorphic<BreadcrumbLinkHtmlProps>
      as={"a"}
      render={render}
      href={href}
      className={tx("hover:text-link-hovered inline-flex cursor-pointer items-center", className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
