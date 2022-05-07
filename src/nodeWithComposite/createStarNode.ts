import { initNodeStyle } from "./initNodeStyle";
import { StarNodeWithComposite } from "./StarNodeWithComposite";


export const createStarNode = (parent: HTMLElement): StarNodeWithComposite => {
  const el = document.createElement("div");

  const node: StarNodeWithComposite = {
    el,
    hasWrapper: false,
  };

  parent.appendChild(el);
  initNodeStyle(node.el);
  return node;
};

