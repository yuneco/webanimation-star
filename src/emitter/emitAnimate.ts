import { StarAnimOption } from "../nodeBase/StarAnimOption";
import { StarNodeWithWrapper } from "../nodeWithWrapper/StarNodeWithWrapper";
import { StarNodeWithComposite } from "../nodeWithComposite/StarNodeWithComposite";

const G = 1000;

const animateX = (
  el: HTMLElement,
  option: StarAnimOption
) => {
  // キーフレーム1
  const init = {
    visibility: "visible",
    opacity: 1,
    transform: `
      translate(${option.pos.x}px, ${option.pos.y}px) 
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
      translate(${option.vec.x * fromOffset + option.pos.x}px, ${
      option.vec.y * fromOffset + option.pos.y
    }px) 
      scale(${option.scale}) 
      rotate(0deg)
    `,
    offset: fromOffset,
  };
  // キーフレーム3
  const to = {
    visibility: "hidden",
    opacity: option.alpha,
    transform: `
      translate(${option.vec.x + option.pos.x}px, ${option.vec.y + option.pos.y}px) 
      scale(0) 
      rotate(${option.angle}deg)
    `,
  };
  // キーフレーム1-3を使ってアニメーション
  return el.animate([init, from, to], {
    duration: option.duration,
    iterations: 1,
  });
};

const animateY = (
  el: HTMLElement,
  option: StarAnimOption,
  composite: boolean
) => {
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
  return el.animate([vFrom, vTo], {
    duration: option.duration,
    iterations: 1,
    // 緩い放物線を描くようにイージングを設定する
    easing: "cubic-bezier(.37,.01,.96,.58)",
    composite: composite ? "accumulate" : "replace",
  });
};

export const emitAnimate = (
  node: StarNodeWithComposite | StarNodeWithWrapper,
  option: StarAnimOption
) => {
  const animX = animateX(node.el, option);
  const animY = node.hasWrapper
    ? animateY(node.elWrapper, option, false)
    : animateY(node.el, option, true);

  return [animX, animY];
};
