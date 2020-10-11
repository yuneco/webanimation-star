import { Point } from "./Point.js";
import { randomPos, randomWithin } from "./Random.js";
import { StarAnimOption } from "./StarAnimOption.js";
import {emitStar} from "./StarNode.js";
import { StarOption } from "./StarOption.js";

export class Emitter {
  constructor (parent) {
    this._timer = null;
    this._lastTime = 0;
    this.parent = parent;
    this.nps = 10;
    this.pos = new Point(),
    this.vec = new Point(100, 100),
    this.duration = 4000;
  }

  start () {
    if (this._timer) {
      return;
    }
    this._lastTime = Date.now();
    const interval = 1000 / this.nps;
    this._timer = setTimeout(() => {
      const origin = randomPos(this.pos.clone(), 40);
      const actualInterval = Date.now() - this._lastTime;
      const count = Math.max(1, Math.round(actualInterval / interval));
      for (let i = 0; i < count; i++) {
        emitStar(
          this.parent,
          new StarOption(
            origin,
            randomWithin(15, 40)
          ),
          new StarAnimOption(
            this.duration + randomWithin(-500, 500),
            this.vec,
            randomWithin(0, 0),
            randomWithin(-720, 720),
            1)
        );
      }
      this._timer = null;
      this.start();
    }, interval);
  }

  stop () {
    clearTimeout(this._timer);
  }
}