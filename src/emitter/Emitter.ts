import { StarAnimOption } from "../nodeBase/StarAnimOption";
import { point, Point } from "../utils/Point";
import { randomPos, randomWithin } from "../utils/Random";
import { Timer } from "../utils/Timer";
import { emitStar } from "./emitNode";

const MAX_EMIT_ATONCE = 4;

/** 単一のノードを射出します。パラメータは一定の幅でランダムに設定されます */
const emit = (
  parent: HTMLElement,
  mode: StarAnimOption["animationMode"],
  pos: Point,
  dur: number,
  vec: Point
) => {
  emitStar(parent, {
    pos: randomPos(pos, 40),
    duration: dur,
    vec,
    scale: randomWithin(0.15, 0.6),
    angle: randomWithin(-1800, 1800),
    alpha: 1,
    animationMode: mode,
  });
};

export class Emitter {
  private timer = new Timer();
  private parent: HTMLElement;
  mode: StarAnimOption["animationMode"] = "wrapper";

  /** node / sec */
  nps = 10;
  /** 射出元座標 */
  pos = point();
  /** 角度 */
  vec = point(100, 100);
  /** 生存時間(ms) */
  duration = 3000;

  constructor(parentSelector: string) {
    this.parent = document.querySelector(parentSelector) ?? document.body;
    this.timer.onrun = (delay) => this.emit(delay);
  }

  start() {
    this.timer.start(this.nps);
  }

  stop() {
    this.timer.stop();
  }

  private emit(delay = 1) {
    const count = Math.min(MAX_EMIT_ATONCE, Math.max(1, Math.round(delay)));
    for (let i = 0; i < count; i++) {
      emit(this.parent, this.mode, this.pos, this.duration, this.vec);
    }
  }
}
