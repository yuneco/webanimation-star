import { StarNodeBase } from "../nodeBase/StarNodeBase";

export type StarNodeWithComposite = StarNodeBase & {
  /** ノードの種類を区別するためのフラグ。ラッパー要素を持っていない場合false */
  readonly hasWrapper: false;
};
