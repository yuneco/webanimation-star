import { Point } from "./Point";

export const randomFrom = <T>(arr: T[]) => arr[Math.floor(arr.length * Math.random())];

export const randomWithin = (min: number, max: number) => {
  return min + (max - min) * Math.random();
}

export const randomPos = (point: Point, maxNoise = 10) => {
  point.x += (Math.random() - 0.5) * maxNoise;
  point.y += (Math.random() - 0.5) * maxNoise;
  return point;
}
