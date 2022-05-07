import { StarNodeBase } from "../nodeBase/StarNodeBase";

export type StarNodeWithWrapper = StarNodeBase & {
  /** 重力アニメーションのためのラッパー */
  readonly elWrapper: HTMLElement;
  /** ノードの種類を区別するためのフラグ。ラッパー要素を持っている場合true */
  readonly hasWrapper: true;
};
