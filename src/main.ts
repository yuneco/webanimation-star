import "./style.css";
import { Emitter } from "./Emitter.js";
import { createLines } from "./LineBg.js";
import { point, pointWithlengthAndAngle } from "./utils/Point.js";

/**
 * 適当な背景を生成します
 */
const initBg = () => {
  const bg = document.querySelector(".bglines") as HTMLElement;
  if (!bg) return;
  createLines(bg, ["#131c38", "#201a33", "#23285e", "#1d1c47", "#2e1657"], 20);
};

/**
 * パーティクルを初期化します
 */
const initStage = () => {
  const root = document.querySelector(".stage") as HTMLElement;
  if (!root) return;
  const emitter = new Emitter(root);
  const isLargeScreen = root.clientWidth > 500;
  emitter.pos = point(root.clientWidth / 2, root.clientHeight / 2);
  emitter.vec = pointWithlengthAndAngle(1300, -90);
  emitter.nps = isLargeScreen ? 25 : 15;
  root.addEventListener("mousemove", (ev) => {
    emitter.pos = point(ev.clientX, ev.clientY);
  });
  root.addEventListener("touchmove", (ev) => {
    const tc = ev.touches[0];
    emitter.pos = point(tc.clientX, tc.clientY);
  });
  document.addEventListener("visibilitychange", () => {
    console.log(document.visibilityState);
    emitter[document.visibilityState === "hidden" ? "stop" : "start"]();
  });
  emitter.start();
};

initBg();
initStage();
