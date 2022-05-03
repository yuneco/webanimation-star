import { point, Point } from "./Point";

export const randomFrom = <T>(arr: T[]) =>
  arr[Math.floor(arr.length * Math.random())];

export const randomWithin = (min: number, max: number) => {
  return min + (max - min) * Math.random();
};

export const randomPos = (p: Point, maxNoise = 10) => {
  return point(
    p.x + (Math.random() - 0.5) * maxNoise,
    p.y + (Math.random() - 0.5) * maxNoise
  );
};
