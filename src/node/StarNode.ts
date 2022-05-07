import { StarAnimOption } from "./StarAnimOption";
import { StarOption } from "./StarOption";
import { emitAnimate } from "./emitAnimate";
import { initNodeStyle, initWrapperStyle } from "./initStyle";

// 再利用するためのプール
const nodePool: StarNode[] = [];

type StarNode = {
  /** ノード本体 */
  readonly el: HTMLElement;
  /** 重力アニメーションのためのラッパー */
  readonly elWrapper: HTMLElement;
  // 動作中のアニメーションを保持する配列
  readonly anims: Animation[];
  readonly option: StarOption;
};

const createStarNode = (parent: HTMLElement, option: StarOption) => {
  const node: StarNode = {
    el: document.createElement("div"),
    elWrapper: document.createElement("div"),
    anims: [],
    option: option,
  };
  parent.appendChild(node.elWrapper);
  node.elWrapper.appendChild(node.el);
  initWrapperStyle(node.elWrapper);
  initNodeStyle(node.el);
  return node;
};

/**
 * 方向・速度等の設定にしたがって、ノードを射出します。
 * @param option アニメーションの設定
 */
const emitNode = async (node: StarNode, option: StarAnimOption) => {
  const basePos = node.option.pos;
  const baseScale = node.option.size / 100;

  // 実行中のアニメーションを配列に保持（reset用）
  node.anims.push(...emitAnimate(
    node.el,
    node.elWrapper,
    basePos,
    baseScale,
    option
  ));
  // アニメーションの終了を待つ
  await Promise.all(node.anims.map((anim) => anim.finished));
  // 実行中のアニメーション配列をクリア
  node.anims.length = 0;
};

/**
 * ノードの状態をリセットします
 * 動作中のアニメーションがあればすべて中断し、ノードは非表示になります。
 * @param {StarOption} option  初期位置・スタイルの設定
 */
const resetNode = (node: StarNode, option: StarOption) => {
  node.anims.forEach((anim) => anim.cancel());
  Object.assign(node.option, option);
};

/**
 * 新しくノードを作成するファクトリ関数です。
 * 再利用できるノードがある場合には再利用し、なければ新たに生成します。
 */
const createStar = (parent: HTMLElement, starOption: StarOption) => {
  const star = nodePool.pop();
  if (star) {
    resetNode(star, starOption);
    return star;
  }
  return createStarNode(parent, starOption);
};

/**
 * 新しいノードを生成し、即座にアニメーションを開始します。
 * このメソッドで生成されたノードは、効率化のため、アニメーションの終了後に再利用プールに保存されます。
 * @param {HTMLElement} parent
 * @param {StarOption} starOption
 * @param {StarAnimOption} animOption
 */
export const emitStar = async (
  parent: HTMLElement,
  starOption: StarOption,
  animOption: StarAnimOption
) => {
  const star = createStar(parent, starOption);
  await emitNode(star, animOption);
  nodePool.push(star);
};
