import { initNodeStyle } from "../nodeWithComposite/initNodeStyle";
import { StarNodeWithWrapper } from "./StarNodeWithWrapper";
import { initWrapperStyle } from "./initWrapperStyle";

export const createStarNodeWithWrapper = (
  parent: HTMLElement,
): StarNodeWithWrapper => {
  const el = document.createElement("div");
  const elWrapper = document.createElement("div");

  const node: StarNodeWithWrapper = {
    el,
    elWrapper,
    hasWrapper: true,
  };

  parent.appendChild(elWrapper);
  elWrapper.appendChild(el);
  initNodeStyle(node.el);
  initWrapperStyle(elWrapper);

  return node;
};
