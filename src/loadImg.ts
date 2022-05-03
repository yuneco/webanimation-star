const cache: Record<string, Promise<string> | undefined> = {};

const fetchSvg = async (path: string) => {
  const data = await fetch(path);
  const text = await data.text();
  return `data:image/svg+xml;charset=utf8,${encodeURIComponent(text)}`;
};

export const loadImg = async (path: string) => {
  return (cache[path] = cache[path] ?? fetchSvg(path));
};

export const loadImgToBackground = (el: HTMLElement, path: string) => {
  loadImg(path).then((url) => {
    el.style.backgroundImage = `url('${url}')`;
  });
};
