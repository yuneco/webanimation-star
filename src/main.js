import { Emitter } from "./Emitter.js";
import { Point } from "./Point.js";

const initStage = () => {
  const root = document.querySelector(".stage");
  const emitter = new Emitter(root);
  emitter.pos = new Point(root.clientWidth / 2, root.clientHeight / 2);
  emitter.vec.setLengthAndAngle(1300, -90);
  emitter.nps = 25;
  root.addEventListener("mousemove", ev => {
    emitter.pos = new Point(ev.clientX, ev.clientY);
  });
  emitter.start();
}

initStage();