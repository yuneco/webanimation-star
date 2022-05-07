import "./style.scss";
import { Emitter } from "./emitter/Emitter.js";
import { createLines } from "./LineBg.js";
import { point, pointWithlengthAndAngle } from "./utils/Point.js";

const STAGE_SELECTOR = ".stage";
const emitter = new Emitter(STAGE_SELECTOR);

/**
 * 適当な背景を生成します
 */
const initBg = () => {
  const bg = document.querySelector(".bglines") as HTMLElement;
  if (!bg) return;
  createLines(bg, ["#131c38", "#201a33", "#23285e", "#1d1c47", "#2e1657"], 20);
};

const initStatus = () => {
  const updateStatus = () => {
    const el = document.querySelector(".status") as HTMLElement;
    if (!el) return;
    const divCount = document.querySelectorAll(`${STAGE_SELECTOR} div`).length;
    el.textContent = `${divCount} elements`;
  };

  setInterval(updateStatus, 1000);
};

const initControl = () => {
  const modeSelect = document.querySelector("#mode") as HTMLSelectElement;
  modeSelect.addEventListener("change", () => {
    const mode = modeSelect.value;
    if (mode === "composite" || mode === "wrapper") {
      emitter.mode = mode;
    }
  });
};

/**
 * パーティクルを初期化します
 */
const initStage = () => {
  const root = document.querySelector(STAGE_SELECTOR) as HTMLElement;
  if (!root) return;
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
initControl();
initStage();
initStatus();
