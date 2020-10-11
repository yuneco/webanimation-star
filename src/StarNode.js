import { randomStar } from "./Assets.js";
import { StarAnimOption } from "./StarAnimOption.js";
import { StarOption } from "./StarOption.js";

// 再利用するためのプール
const nodePool = [];

export class StarNode {
  constructor (parent, option = new StarOption()) {
    // ノード本体
    this._el = document.createElement("div");
    // 重力アニメーションのためのラッパー
    this._elWrapper = document.createElement("div");
    // 動作中のアニメーションを保持する配列
    this._anims = [];
    parent.appendChild(this._elWrapper);
    this._elWrapper.appendChild(this._el);
    this.reset(option);
  }

  /**
   * ノードの状態をリセットします
   * 動作中のアニメーションがあればすべて中断し、ノードは非表示になります。
   * @param {StarOption} option  初期位置・スタイルの設定
   */
  reset (option = new StarOption()) {
    this._anims.forEach(anim => anim.cancel());

    const styleWrapper = this._elWrapper.style;
    styleWrapper.position = "absolute";
    styleWrapper.left = `${option.pos.x}px`;
    styleWrapper.top = `${option.pos.y}px`;

    const style = this._el.style;
    style.position = "absolute";
    style.left = "0";
    style.top = "0";
    style.width = `${option.size}px`;
    style.height = `${option.size}px`;
    style.backgroundImage = `url(${randomStar()})`;
    style.visibility = "hidden";
    style.backgroundRepeat = "no-repeat";
  }

  /**
   * 方向・速度等の設定にしたがって、ノードを射出します。
   * @param {StarAnimOption} option アニメーションの設定
   */
  async emit (option = new StarAnimOption()) {
    /// 本体のアニメーション（設定に基づく方向・速度のアニメーション） ///
    // キーフレーム1
    const init = {
      visibility: "visible",
      opacity: 1,
      transform: `
        translate(0px, 0px) 
        scale(0) 
        rotate(${option.angle * -0.3}deg)
      `
    };
    // キーフレーム2
    const fromOffset = 0.1;
    const from = {
      visibility: "visible",
      opacity: 1,
      transform: `
        translate(${option.vec.x * fromOffset}px, ${option.vec.y * fromOffset}px) 
        scale(1) 
        rotate(0deg)
      `,
      offset: fromOffset
    };
    // キーフレーム3
    const to = {
      visibility: "hidden",
      opacity: option.alpha,
      transform: `
        translate(${option.vec.x}px, ${option.vec.y}px) 
        scale(${option.scale}) 
        rotate(${option.angle}deg)
      `
    };
    // キーフレーム1-3を使ってアニメーション
    const anim = this._el.animate([init, from, to], {
      duration: option.duration,
      iterations: 1
    });

    /// 重力（縦方向）のアニメーション ///
    /// 外側のラッパーオブジェクトを重力方向にアニメーションさせる ///
    const G = 1000;
    // アニメーション期間で最終的に到達するY位置を求める
    const totalG = (option.duration / 1000) * G / 2;
    // キーフレーム1
    const vFrom = {
      transform: "translateY(0px)",
    };
    // キーフレーム2
    const vTo = {
      transform: `translateY(${totalG}px)`
    };
    // キーフレーム1-2でアニメーション
    const vAnim = this._elWrapper.animate([vFrom, vTo], {
      duration: option.duration,
      iterations: 1,
      // 緩い放物線を描くようにイージングを設定する
      easing: "cubic-bezier(.37,.01,.96,.58)"
    });    

    // 実行中のアニメーションを配列に保持（reset用）
    this._anims = [anim, vAnim];
    // アニメーションの終了を待つ
    await anim.finished;
    // 実行中のアニメーション配列をクリア
    this._anims = [];
  }
}

/**
 * 新しくノードを作成するファクトリ関数です。
 * 再利用できるノードがある場合には再利用し、なければ新たに生成します。
 */
const createStar = (parent, starOption = new StarOption) => {
  const star = nodePool.pop();
  if (star) {
    star.reset(starOption);
    return star;
  }
  return new StarNode(parent, starOption);
}

/**
 * 新しいノードを生成し、即座にアニメーションを開始します。
 * このメソッドで生成されたノードは、効率化のため、アニメーションの終了後に再利用プールに保存されます。
 * @param {HTMLElement} parent 
 * @param {StarOption} starOption 
 * @param {StarAnimOption} animOption 
 */
export const emitStar = async (parent, starOption = new StarOption, animOption = new StarAnimOption()) => {
  const star = createStar(parent, starOption);
  await star.emit(animOption)
  nodePool.push(star);
}
