import { randomStar } from "../assets/Assets";
import { loadImgToBackground } from "../assets/loadImg";

export const initNodeStyle = (el: HTMLElement) => {
  const style = el.style;
  style.position = "absolute";
  style.left = "0";
  style.top = "0";
  style.width = "100px";
  style.height = "100px";
  style.imageRendering = "pixelated";
  style.visibility = "hidden";
  style.backgroundRepeat = "no-repeat";
  style.willChange = "transform";
  loadImgToBackground(el, randomStar());
};
