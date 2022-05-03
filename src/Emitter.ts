import { point, Point } from "./utils/Point";
import { randomPos, randomWithin } from "./utils/Random";
import { createStarAnimOption } from "./node/StarAnimOption";
import { emitStar } from "./node/StarNode";
import { createStarOption } from "./node/StarOption";
import { Timer } from "./utils/Timer";

const MAX_EMIT_ATONCE = 4;

/** 単一のノードを射出します。パラメータは一定の幅でランダムに設定されます */
const emit = (parent: HTMLElement, pos: Point, dur: number, vec: Point) => {
  emitStar(
    parent,
    createStarOption(randomPos(pos, 40), randomWithin(15, 60)),
    createStarAnimOption(
      dur,
      vec,
      randomWithin(0, 0),
      randomWithin(-1800, 1800),
      1
    )
  );
};

export class Emitter {
  private timer = new Timer();
  private parent: HTMLElement;

  /** node / sec */
  nps = 10;
  /** 射出元座標 */
  pos = point();
  /** 角度 */
  vec = point(100, 100);
  /** 生存時間(ms) */
  duration = 3000;

  constructor(parent: HTMLElement) {
    this.parent = parent;
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
      emit(this.parent, this.pos, this.duration, this.vec);
    }
  }
}
