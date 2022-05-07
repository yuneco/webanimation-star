import { StarNodeWithComposite } from "../nodeWithComposite/StarNodeWithComposite";
import { StarNodeWithWrapper } from "../nodeWithWrapper/StarNodeWithWrapper";

export const disposeNode = (
  node: StarNodeWithComposite | StarNodeWithWrapper
) => {
  const el = node.hasWrapper ? node.elWrapper : node.el;
  el.parentNode?.removeChild(el);
};
