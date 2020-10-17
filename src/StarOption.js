import { Point } from "./Point.js";

export class StarOption {
  /**
   * 新しい星の設定を作ります
   * @param {Point} pos 基準位置の座標
   * @param {Number} size 基準サイズ
   * @param {String} color 色（CSS色表現）
   */
  constructor (pos, size = 10, color = "#ffff00") {
    this.pos = pos.clone();
    this.size = size;
    this.color = color;
  }
}
