import { Point } from "./Point.js";

export class StarOption {
  constructor (pos = new Point(), size = 10, color = "#ffff00") {
    this.pos = pos;
    this.size = size;
    this.color = color;
  }
}
