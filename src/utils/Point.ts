const a2r = (a: number) => (a / 180) * Math.PI;
const r2a = (r: number) => (r / Math.PI) * 180;

export type Point = {
  readonly x: number;
  readonly y: number;
};

export const point = (x = 0, y = 0) => ({ x, y });

export const clonePoint = (p: Point) => point(p.x, p.y);

export const pointLength = (p: Point) => {
  return Math.sqrt(p.x * p.x + p.y * p.y);
};

export const pointAngle = (p: Point) => {
  const rad = Math.atan2(p.x, p.y);
  return r2a(rad);
};

export const pointWithlengthAndAngle = (l: number, a: number) => {
  const rad = a2r(a);
  return point(Math.cos(rad) * l, Math.sin(rad) * l);
};
