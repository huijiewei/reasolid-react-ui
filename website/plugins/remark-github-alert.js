import { visit } from "unist-util-visit";

const GITHUB_ALERT_DECLARATION_REGEX = /^\s*\[!(?<type>\w+)]\s*$/;

export default function () {
  return (tree) => {
    visit(tree, "blockquote", (node, index, parent) => {
      const [firstChild, ...blockQuoteChildren] = node.children;

      if (firstChild?.type !== "paragraph") {
        return;
      }

      const [firstParagraphChild, ...paragraphChildren] = firstChild.children;

      if (firstParagraphChild?.type !== "text") {
        return;
      }

      const [possibleTypeDeclaration, ...textNodes] = firstParagraphChild.value.split("\n");

      if (possibleTypeDeclaration === undefined) {
        return;
      }

      const match = possibleTypeDeclaration.match(GITHUB_ALERT_DECLARATION_REGEX);
      const type = match?.groups?.type;

      if (type == null) {
        return;
      }

      const textNodeChildren = textNodes.length > 0 ? [{ type: "text", value: textNodes.join("\n") }] : [];

      const hasParagraphChildren = textNodeChildren.length > 0 || paragraphChildren.length > 0;

      const alertParagraphChildren = hasParagraphChildren
        ? [
            {
              type: "paragraph",
              children: [...textNodeChildren, ...paragraphChildren],
            },
          ]
        : [];

      if (parent === undefined || index === undefined) {
        return;
      }

      parent.children[index] = {
        type: node.type,
        data: {
          hProperties: {
            "data-type": type,
          },
        },
        children: [...alertParagraphChildren, ...blockQuoteChildren],
      };
    });
  };
}
