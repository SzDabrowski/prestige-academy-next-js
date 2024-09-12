import { Block, Inline, Text } from "@contentful/rich-text-types"; // Make sure to import types

// Function to safely extract the value if it's a Text node
export default function getTextValueContentful(
  node: Block | Inline | Text | undefined
) {
  if (node && "value" in node && typeof node.value === "string") {
    return node.value;
  }
  return "";
}
