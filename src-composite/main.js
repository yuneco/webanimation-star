const cubicEaseOut = "cubic-bezier(.01,.47,.51,1)";
const cubicEaseIn = "cubic-bezier(.47,0,.99,.54)";

const animateWave = async (el) => {
  el.style.transform = "";
  const animX = el.animate([
    { transform: "translateX(0px)"},
    { transform: "translateX(200px)" }
  ], {
    duration: 4000,
    composite: "add",
    fill: "forwards",
    easing: "linear"
  });
  const animY = el.animate([
    { transform: "translateY(0px)" },
    { transform: "translateY(200px)" }     
  ], {
    duration: 800,
    composite: "add",
    fill: "forwards",
    direction: "alternate",
    iterations: Infinity,
    easing: cubicEaseIn
  });
  const animScale = el.animate([
    { transform: "scale(1)"},
    { transform: "scale(2)" }
  ], {
    duration: 1000,
    composite: "add",
    direction: "alternate",
    easing: "ease-in-out",
    iterations: Infinity
  });
  await animX.finished;
  [animX, animY, animScale].forEach(anim => anim.cancel());
  el.style.transform = "scale(1) translate(200px, 200px)";
};


const animateYOut = async (el) => {
  el.style.transform = "";
  const anim1 = el.animate([
    { transform: "translateX(0px)"},
    { transform: "translateX(200px)" }
  ], {
    duration: 4000,
    composite: "accumulate",
    fill: "forwards",
    easing: "linear",
    endDelay: 100
  });
  const anim2 = el.animate([
    { transform: "translateY(0px)" },
    { transform: "translateY(200px)" }     
  ], {
    duration: 4000,
    composite: "accumulate",
    fill: "forwards",
    easing: cubicEaseOut
  });
  await anim2.finished
//  anim1.commitStyles()
  anim2.commitStyles()
  anim1.cancel();
  anim2.cancel();
  // el.style.transform = "translate(200px, 200px)";
};

const animateOut = (el) => {
  el.animate([
    { transform: "translate(0px, 0)"},
    { transform: "translate(200px, 200px)" }
  ], {
    duration: 4000,
    easing: cubicEaseOut,
    fill: "forwards"
  });
};

const animateLinear = (el) => {
  el.animate([
    { transform: "translate(0px, 0)"},
    { transform: "translate(200px, 200px)" }
  ], {
    duration: 4000,
    fill: "forwards",
    easing: "linear"
  });
};

const createRect = (color, isFilled=true, w=20, h=20, isCentered=true) => {
  const el = document.createElement("div");
  const st = el.style;
  st.position = "absolute";
  st.top = isCentered ? `${-w/2}px`: 0;
  st.left = isCentered ? `${-h/2}px` : 0;
  st.width = `${w}px`;
  st.height = `${h}px`;
  st.backgroundColor = isFilled ? color : "transparent";
  st.border = !isFilled ? `1px solid ${color}` : "none";
  return el;
}


const animateLinearWithDir = (el, dir = "X") => {
  if (!"xyXY".includes(dir)) {
    throw new Error("dir must be X or Y");
  }
  const animDir = dir.toUpperCase();
  el.animate([
    { transform: `translate${dir}(0px)`},
    { transform: `translate${dir}(200px)` }
  ], {
    duration: 4000,
    fill: "forwards",
    easing: "linear"
  });
}

const initStage = () => {
  const root = document.querySelector(".stage");
  const box = createRect("white", false, 200, 200, false);
  box.style.left = "50px";
  box.style.top = "50px";
  root.appendChild(box);

  const el1 = createRect("gold");
  const el2 = createRect("salmon");
  const el3 = createRect("powderblue");
  const el4 = createRect("thistle");
  [el1, el2, el3, el4].forEach(rect => {
    rect.style.borderRadius = "4px";
  })

  const lineV = createRect("white", true, 1, 200, false);
  const lineH = createRect("white", true, 200, 1, false);
  const lineX = createRect("white", true, 200 * 1.414, 1, false);
  lineX.style.transformOrigin = "left";
  lineX.style.transform = "rotate(45deg)";

  box.appendChild(lineH);
  box.appendChild(lineV);
  box.appendChild(lineX);

  box.appendChild(el1);
  box.appendChild(el2);
  box.appendChild(el3);
  box.appendChild(el4);

  document.querySelector("#run").addEventListener("click", async (ev) => {
    animateLinear(el1);
    animateOut(el2);
    animateYOut(el3);
    animateWave(el4);
    animateLinearWithDir(lineV, "X");
    animateLinearWithDir(lineH, "Y");
  })
}

initStage();