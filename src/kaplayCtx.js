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

export const translations = {
    "game-title": {
        en: "SELECT YOUR LANGUAGE",
        pt: "SELECIONE SEU IDIOMA",
    },
    "game-over": {
      en: "GAME OVER",
      pt: "FIM DE JOGO",
    },
    "start-button":{
      en: "START",
      pt: "COMEÇAR",
    },
    "space-to-start":{
      en: "Press space/Click/Mouse to start",
      pt: "Pressione Espaço/Clique/Mouse para começar"
    },
    // Add all other game texts here
};

export default k;