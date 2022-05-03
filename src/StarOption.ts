import { Point } from "./Point.js";

export type StarOption = {
  /** 基準位置の座標 */
  pos: Point,
  /** 基準サイズ */
  size: number,
  /** 色（CSS色表現） */
  color: string,
};

/**
 * 新しい星の設定を作ります
 * @param pos 基準位置の座標
 * @param size 基準サイズ
 * @param color 色（CSS色表現）
 */
export const createStarOption = (pos: Point, size = 10, color = "#ffff00"): StarOption => ({
  pos: pos.clone(),
  size: size,
  color: color,
});
