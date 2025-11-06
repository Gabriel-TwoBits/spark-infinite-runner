import k from "./kaplayCtx.js";
import mainMenu from "./scenes/mainMenu.js";
import game from "./scenes/game.js";
import gameOver from "./scenes/game-over.js";
import languageMenu from "./scenes/language-menu.js";

k.loadSprite("boss-bg", "graphics/boss-bg.png")
k.loadSprite("platforms", "graphics/platforms-sheet.png");
k.loadSprite("spark-art", "graphics/fark_art.png");

k.loadSprite("spark", "graphics/spark_running_sheet.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    run:{
      from: 0, to: 7, loop: true, speed: 30, pingpong: false
    },
  },
});

k.loadSprite("spark_walk", "graphics/spark_walk-sheet.png", {
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

k.loadSprite("spark_attack", "graphics/spark_attack_spritesheet.png", {
  sliceX: 9,
  anims: {
    attack:{
      from: 0, to: 8, loop: false, speed: 30
    },
  },
});

k.loadSprite("caria-bg", "graphics/caria-bg.png", {
  sliceX: 4,
  sliceY: 8,
  anims: {
    flow:{
      from: 0, to: 3, loop: true, speed: 1, pingpong: true
    }
  }
})

k.loadSprite("ring", "graphics/start.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    spin: {
      from: 0, to: 4, loop: true, speed: 10
    },
  },
});

k.loadSprite("motobug", "graphics/enemy_animation.png", {
  sliceX: 7,
  sliceY: 1,
  anims:{
    run: {
      from: 0, to: 6, loop: true, speed: 15, pingpong: true
    },
  },
});

k.loadFont("mania", "fonts/mania.ttf");

k.loadSound("destroy", "sounds/EnemyExplosion.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Get_Spark_Collectable.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("stage", "sounds/Flower_Mountain_City.wav");
k.loadSound("air-slash", "sounds/AirSlash.wav")

k.scene("language-menu", languageMenu);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("game-over", gameOver);

k.go("language-menu");