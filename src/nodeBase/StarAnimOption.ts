import { Point } from "../utils/Point";
import { AnimationMode } from "./AnimationMode";

export type StarAnimOption = {
  /** アニメーション時間 */
  duration: number;
  /** 移動方向と速さ */
  vec: Point;
  /** 射出位置 */
  pos: Point;
  /** スケール */
  scale: number;
  /** 角度 */
  angle: number;
  /** 透明度(0-1) */
  alpha: number;
  /** アニメーションの合成方法 */
  animationMode: AnimationMode
};
