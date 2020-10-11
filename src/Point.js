const a2r = a => a / 180 * Math.PI;
const r2a = r => r / Math.PI * 180;

export class Point {
  constructor (x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  clone () {
    return new Point(this.x, this.y);
  }
  
  get x () { return this._x; }
  get y () { return this._y; }
  set x (v) { this._x = v; }
  set y (v) { this._y = v; }

  get length () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  get angle () {
    const rad = Math.atan2(this.x, this.y);
    return r2a(rad);
  }

  setLengthAndAngle (l, a) {
    const rad = a2r(a);
    this.x = Math.cos(rad) * l;
    this.y = Math.sin(rad) * l;
  }
}