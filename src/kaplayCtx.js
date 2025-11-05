import kaplay from "kaplay";

const k = kaplay({
  background: [0, 0, 0],
  width: 1920,
  height: 1080,
  letterbox: true,
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
        keyboard: ["space", "w"],
        mouse: ["left"],
    },
  },
  debugKey: "z",
  debug: true,
});

export default k;