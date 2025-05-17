export function parseTreeToJson(node, parser) {
  if (!node) return null;

  if (node.children) {
    return {
      name: parser.ruleNames[node.ruleIndex] || "UNKNOWN",
      children: node.children.map((child) => parseTreeToJson(child, parser)),
    };
  } else {
    return { name: node.getText() };
  }
}
