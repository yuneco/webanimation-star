import { Emitter } from "./Emitter.js";
import { Point } from "./Point.js";

const initStage = () => {
  const root = document.querySelector(".stage");
  const emitter = new Emitter(root);
  emitter.pos = new Point(root.clientWidth / 2, root.clientHeight / 2);
  emitter.vec.setLengthAndAngle(800, -90);
  root.addEventListener("mousemove", ev => {
    emitter.pos = new Point(ev.clientX, ev.clientY);
  });
  emitter.start();
}

initStage();