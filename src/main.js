import k from "./kaplayCtx.js";
import mainMenu from "./scenes/mainMenu.js";
import game from "./scenes/game.js";
import gameOver from "./scenes/game-over.js";
import languageMenu from "./scenes/language-menu.js";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");

k.loadSprite("spark", "graphics/spark_running.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    run:{
      from: 0, to: 2, loop: true, speed: 20, pingpong: true
    },
  },
});

k.loadSprite("spark_walk", "graphics/spark_walk.png", {
  sliceX: 12,
  anims: {
    walk:{
      from: 0, to: 11, loop: true, speed: 20
    },
  },
});

k.loadSprite("spark_jump", "graphics/spark_jump.png", {
  sliceX: 6,
  anims: {
    jump:{
      from: 0, to: 5, loop: false, speed: 10 
    },
  },
});

k.loadSprite("spark_attack", "graphics/spark_attack.png", {
  sliceX: 9,
  anims: {
    attack:{
      from: 0, to: 8, loop: false, speed: 50
    },
  },
});

k.loadSprite("caria-bg", "graphics/caria-bg.png", {
  sliceX: 4,
  sliceY: 7,
  anims: {
    flow:{
      from: 0, to: 3, loop: true, speed: 0.5, pingpong: true
    }
  }
})

k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: {
      from: 0, to: 15, loop: true, speed: 30
    },
  },
});

k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims:{
    run: {
      from: 0, to: 4, loop: true, speed: 8
    },
  },
});

k.loadFont("mania", "fonts/mania.ttf");

k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("stage", "sounds/Flower_Mountain_City.wav")

k.scene("language-menu", languageMenu);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("game-over", gameOver);

k.go("language-menu");