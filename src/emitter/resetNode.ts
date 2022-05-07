import { StarNodeWithWrapper } from "../nodeWithWrapper/StarNodeWithWrapper";
import { StarNodeWithComposite } from "../nodeWithComposite/StarNodeWithComposite";

/**
 * ノードの状態をリセットします
 * @param {StarOption} option  初期位置・スタイルの設定
 */
export const resetNode = (
  node: StarNodeWithComposite | StarNodeWithWrapper,
  parent: HTMLElement
) => {
  const el = node.hasWrapper ? node.elWrapper : node.el;
  if (el !== parent) {
    parent.appendChild(el);
  }
};
