export class StarAnimOption {
  /**
   * 新しいアニメーション設定を作成します
   * @param {Number} duration アニメーション時間
   * @param {Point} vec 移動方向と速さ
   * @param {Number} scale スケール
   * @param {Number} angle 角度
   * @param {Number} alpha 透明度(0-1)
   */
  constructor (duration, vec, scale = 1, angle = 0, alpha = 1) {
    this.duration = duration;
    this.vec = vec.clone();
    this.scale = scale;
    this.angle = angle;
    this.alpha = alpha;
  }
}

