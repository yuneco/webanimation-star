import { Point } from "../utils/Point";
import { StarAnimOption } from "./StarAnimOption";

const G = 1000;

export const emitAnimate = (el: HTMLElement, elWrapper: HTMLElement, basePos: Point, baseScale: number, option: StarAnimOption) => {
  /// 本体のアニメーション（設定に基づく方向・速度のアニメーション） ///
  // キーフレーム1
  const init = {
    visibility: "visible",
    opacity: 1,
    transform: `
      translate(${basePos.x}px, ${basePos.y}px) 
      scale(0) 
      rotate(${option.angle * -0.3}deg)
    `,
  };
  // キーフレーム2
  const fromOffset = 0.1;
  const from = {
    visibility: "visible",
    opacity: 1,
    transform: `
      translate(${option.vec.x * fromOffset + basePos.x}px, ${
      option.vec.y * fromOffset + basePos.y
    }px) 
      scale(${baseScale}) 
      rotate(0deg)
    `,
    offset: fromOffset,
  };
  // キーフレーム3
  const to = {
    visibility: "hidden",
    opacity: option.alpha,
    transform: `
      translate(${option.vec.x + basePos.x}px, ${option.vec.y + basePos.y}px) 
      scale(${option.scale * baseScale}) 
      rotate(${option.angle}deg)
    `,
  };
  // キーフレーム1-3を使ってアニメーション
  const anim = el.animate([init, from, to], {
    duration: option.duration,
    iterations: 1,
  });

  /// 重力（縦方向）のアニメーション ///
  /// 外側のラッパーオブジェクトを重力方向にアニメーションさせる ///
  // アニメーション期間で最終的に到達するY位置を求める
  const totalG = ((option.duration / 1000) * G) / 2;
  // キーフレーム1
  const vFrom = {
    transform: "translateY(0px)",
  };
  // キーフレーム2
  const vTo = {
    transform: `translateY(${totalG}px)`,
  };
  // キーフレーム1-2でアニメーション
  const vAnim = elWrapper.animate([vFrom, vTo], {
    duration: option.duration,
    iterations: 1,
    // 緩い放物線を描くようにイージングを設定する
    easing: "cubic-bezier(.37,.01,.96,.58)",
  });

  return [anim, vAnim];
}
