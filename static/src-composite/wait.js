export const wait = ms => new Promise((resolve, reject) => {
  setTimeout(resolve, ms)
});
