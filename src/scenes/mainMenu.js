import k from "../kaplayCtx.js";
import spawnSpark from "../entities/spark.js";

export default function mainMenu(){
    if (!k.getData("best-score")) k.setData("best-score", 0);
    k.onButtonPress("jump", () => {
        k.go("game");
    });

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("caria-bg", {anim: "flow"}),
            k.pos(0, 0),
            k.scale(6),
        ]),
        k.add([
            k.sprite("caria-bg", {anim: "flow"}),
            k.pos(bgPieceWidth * 2, 0),
            k.scale(6),
        ]),
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([
            k.sprite("platforms"),
            k.pos(0, 450),
            k.scale(4),
        ]),
        k.add([
            k.sprite("platforms"),
            k.pos(platformWidth * 4, 450),
            k.scale(4),
        ]),
    ];

    const mainText = k.add([
        k.text("SPARK THE INFINITE RUNNER JESTER", {font: "mania", size: 96, outline: 10}),
        k.pos(k.center().x, 450),
        k.anchor("center"),
    ]);
    
    const pressStart = k.add([
        k.text("Press space to start", {font: "mania", size: 60}),
        k.pos(k.center().x, 550),
        k.anchor("center"),
    ])
    
    spawnSpark(k.vec2(k.center().x, 750));

    k.onUpdate(() => {
        if(bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth, 0);
            bgPieces.push(bgPieces.shift());
        };

        bgPieces[0].move(-200, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth, 0);

        if (platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        };

        platforms[0].move(-2000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });
};
