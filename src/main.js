import { Emitter } from "./Emitter.js";
import { createLines } from "./LineBg.js";
import { Point } from "./Point.js";

/**
 * 適当な背景を生成します
 */
const initBg = () => {
  const bg = document.querySelector(".bglines");
  createLines(bg, [
    "#131c38",
    "#201a33",
    "#23285e",
    "#1d1c47",
    "#2e1657"
  ], 20);
}

/**
 * パーティクルを初期化します
 */
const initStage = () => {
  const root = document.querySelector(".stage");
  const emitter = new Emitter(root);
  const isLargeScreen = root.clientWidth > 500;
  emitter.pos = new Point(root.clientWidth / 2, root.clientHeight / 2);
  emitter.vec.setLengthAndAngle(1300, -90);
  emitter.nps = isLargeScreen ? 25 : 15;
  root.addEventListener("pointermove", ev => {
    emitter.pos = new Point(ev.clientX, ev.clientY);
  });
  emitter.start();
}

initBg();
initStage();