export const initWrapperStyle = (el: HTMLElement) => {
  const styleWrapper = el.style;
  styleWrapper.position = "absolute";
  styleWrapper.left = "0";
  styleWrapper.top = "0";
  styleWrapper.willChange = "transform";
};
