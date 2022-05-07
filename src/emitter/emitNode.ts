import { resetNode } from "./resetNode";
import { StarAnimOption } from "../nodeBase/StarAnimOption";
import { createStarNode } from "../nodeWithComposite/createStarNode";
import { emitAnimate } from "./emitAnimate";
import { StarNodeWithComposite } from "../nodeWithComposite/StarNodeWithComposite";
import { StarNodeWithWrapper } from "../nodeWithWrapper/StarNodeWithWrapper";
import { createStarNodeWithWrapper } from "../nodeWithWrapper/createStarWithWrapper";
import { AnimationMode } from "../nodeBase/AnimationMode";
import { disposeNode } from "./disposeNode";

// 再利用するためのプール
const poolWithComposite: StarNodeWithComposite[] = [];
const poolWithWrapper: StarNodeWithWrapper[] = [];
// 現在のアニメーションモード
// 不要なノードを保持し続けないよう、モード切り替え時にはプールをリセットしています
let currentMode: AnimationMode = "wrapper";

/** ノードプールをリセットします */
const resetPool = () => {
  [...poolWithComposite, ...poolWithWrapper].forEach(disposeNode);
  poolWithComposite.length = 0;
  poolWithWrapper.length = 0;
};

/** プールからノードを取得します。足りない場合は新規に生成します */
const getNode = (parent: HTMLElement, mode: AnimationMode) => {
  const enableComposite = mode === "composite";
  if (currentMode !== mode) {
    console.log("ノードプールをリセットします");
    resetPool();
    currentMode = mode;
  }

  const pooledNode = (
    enableComposite ? poolWithComposite : poolWithWrapper
  ).pop();
  if (pooledNode) {
    resetNode(pooledNode, parent);
    return pooledNode;
  }
  return (enableComposite ? createStarNode : createStarNodeWithWrapper)(parent);
};

/** 使い終わったノードをプールに返却します */
const returnNode = (node: StarNodeWithComposite | StarNodeWithWrapper) => {
  const nodeMode: AnimationMode = node.hasWrapper ? "wrapper" : "composite";
  // 現在のモードが変わっていたら、プールに戻さずに破棄する
  if (currentMode !== nodeMode) {
    disposeNode(node);
    return;
  }
  if (node.hasWrapper) {
    poolWithWrapper.push(node);
  } else {
    poolWithComposite.push(node);
  }
};

/**
 * 新しいノードを生成し、即座にアニメーションを開始します。
 * このメソッドで生成されたノードは、効率化のため、アニメーションの終了後に再利用プールに保存されます。
 */
export const emitStar = async (
  parent: HTMLElement,
  animOption: StarAnimOption
) => {
  const node = getNode(parent, animOption.animationMode);
  const anims = emitAnimate(node, animOption);

  // アニメーションの終了を待つ
  await Promise.all(anims.map((anim) => anim.finished));

  returnNode(node);
};
