import { Point } from "../utils/Point";

export type StarAnimOption = {
  /** アニメーション時間 */
  duration: number;
  /** 移動方向と速さ */
  vec: Point;
  /** スケール */
  scale: number;
  /** 角度 */
  angle: number;
  /** 透明度(0-1) */
  alpha: number;
};

export const createStarAnimOption = (
  duration: number,
  vec: Point,
  scale = 1,
  angle = 0,
  alpha = 1
): StarAnimOption => ({
  duration,
  vec,
  scale,
  angle,
  alpha,
});
