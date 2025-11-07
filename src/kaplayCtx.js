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
  debug: false,
});

export const translations = {
    "game-title": {
        en: "PLEASE, SELECT YOUR LANGUAGE",
        pt: "POR GENTILEZA, SELECIONE SEU IDIOMA",
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
      en: "Press Space/Click/Mouse to start",
      pt: "Pressione Espaço/Clique/Mouse para começar"
    },
    "space-to-play-again":{
      en: "Press Space/Click/Mouse to play again",
      pt: "Pressione Espaço/Clique/Mouse para jogar novamente",
    },
    "best-score-text":{
      en: "BEST SCORE:",
      pt: "MELHOR PONTUAÇÃO:",
    },
    "current-score-text":{
      en: "CURRENT SCORE:",
      pt: "PONTUAÇÃO ATUAL:",
    },
    "hint":{
      en: "Hint: Try jumping while in the air!",
      pt: "Dica: Tente pular enquanto está no ar!",
    },
    "disclaimer": {
      en: "The rights to this character belong to Feperd Games.\nThis is a fangame made with assets from the first game in the series.\nA special thanks to the users from The Spriters Resource\nfor the Spark sprites and Atomic Realm for the cool platform asset.",
      pt: "Os direitos deste personagem pertencem à Feperd Games.\nEsse é um fangame feito com os assets do primeiro jogo da franquia.\nUm agradecimento especial aos usuário do The Spriters Resource\npelos sprites do Spark e o Atomic Realm pelo asset de plataforma daora.",
    },
    "score": {
      en: "SCORE: ",
      pt: "PONTUAÇÃO: ",
    },
    // Add all other game texts here
};

export default k;