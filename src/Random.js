export const randomFrom = arr => arr[Math.floor(arr.length * Math.random())];

export const randomWithin = (min, max) => {
  return min + (max - min) * Math.random();
}

export const randomPos = (point, maxNoise = 10) => {
  point.x += (Math.random() - 0.5) * maxNoise;
  point.y += (Math.random() - 0.5) * maxNoise;
  return point;
}
