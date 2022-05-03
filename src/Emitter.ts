import { Point } from "./Point";
import { randomPos, randomWithin } from "./Random";
import { createStarAnimOption } from "./StarAnimOption";
import {emitStar} from "./StarNode";
import { createStarOption } from "./StarOption";

const MAX_EMIT_ATONCE = 4;

export class Emitter {
  private _timer: number | undefined;
  private _lastTime: number;
  private parent: HTMLElement;
  nps: number;
  pos: Point;
  vec: Point;
  private duration: number;

  constructor (parent: HTMLElement) {
    this._timer = undefined;
    this._lastTime = 0;
    this.parent = parent;
    this.nps = 10;
    this.pos = new Point(),
    this.vec = new Point(100, 100),
    this.duration = 3000;
  }

  start () {
    if (this._timer) { return; }
    const interval = 1000 / this.nps;
    this._timer = setInterval(() => {
      this._onEmit()
    }, interval);
  }

  _onEmit () {
    const interval = 1000 / this.nps;
    const actualInterval = Date.now() - this._lastTime;
    this._lastTime = Date.now();

    const count = Math.min(MAX_EMIT_ATONCE, Math.max(1, Math.round(actualInterval / interval)));
    const origin = randomPos(this.pos.clone(), 40);
    for (let i = 0; i < count; i++) {
      emitStar(
        this.parent,
        createStarOption(
          origin,
          randomWithin(15, 60)
        ),
        createStarAnimOption(
          this.duration, // + randomWithin(-500, 500),
          this.vec,
          randomWithin(0, 0),
          randomWithin(-1800, 1800),
          1)
      );
    }
  }

  stop () {
    clearTimeout(this._timer);
    this._timer = undefined;
  }
}