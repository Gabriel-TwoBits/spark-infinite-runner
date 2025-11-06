import k from "../kaplayCtx";
import spawnSpark from "../entities/spark";
import {spawnRobot} from "../entities/robot";
import spawnCoin from "../entities/coin";
import { T } from "./language-menu.js";

export default function game(isPlaying){
    k.setGravity(3500);

    let stage
    if (!isPlaying) {
        stage = k.play("stage", {volume: 0.4, loop: true});
    };

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("caria-bg", {anim: "flow"}),
            k.pos(0, 0),
            k.scale(6),
        ]),
        k.add([
            k.sprite("caria-bg", {anim: "flow"}),
            k.pos(bgPieceWidth, 0),
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

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });
    let score = 0;
    let scoreMultiplier = 0;

    const scoreText = k.add([
        k.text(T("score"), {font: "mania", size: 72}),
        k.pos(20, 20),
        "localized",
        { translationKey: "score" },
    ])

    const scorePoints = k.add([
        k.text("0", {font: "mania", size: 72}),
        k.pos(scoreText.width + 10, 20),
    ]);

    const spark = spawnSpark(k.vec2(200, 800));
    spark.setControls();
    spark.setEvents();
    spark.onCollide("enemy", (enemy) => {
        if (!spark.isGrounded() && spark.isAttacking){
            k.play("destroy");
            k.destroy(enemy);

            //spark.play("jump");
            spark.jump();

            scoreMultiplier++;
            score += 10 * scoreMultiplier;
            scorePoints.text = `${score}`;
            if (scoreMultiplier === 1)
                spark.ringCollectUI.text = `+${10 * scoreMultiplier}`;
            if (scoreMultiplier > 1) spark.ringCollectUI.text = `x${scoreMultiplier}`;
            k.wait(1, () => {
                spark.ringCollectUI.text = "";
            });
            return;
        };

        k.play("hurt", {volume: 0.5});
        k.setData("current-score", score);
        k.go("game-over");
    });
    spark.onCollide("ring", (ring) => {
        k.play("ring", {volume: 0.5});
        k.destroy(ring);

        score++;
        scorePoints.text = `${score}`;

        spark.ringCollectUI.text = "+1";
        k.wait(1, () => spark.ringCollectUI.text = "");
        return;
    });

    const placeOnScreen = (type) => {
        const waitTimeEnemy = k.rand(0.5, 2.5);
        const waitTimeCoin = k.rand(0.5, 1.5);

        switch(type){
            case "robot":
                const motobug = spawnRobot(k.vec2(1950, 750));
                motobug.onUpdate(() => {
                    if (gameSpeed < 3000){
                        motobug.move(-(gameSpeed + 300), 0);
                        return;
                    };

                    motobug.move(-gameSpeed, 0);
                });

                motobug.onExitScreen(() => {
                    if (motobug.pos.x < 0) k.destroy(motobug);
                });

                k.wait(waitTimeEnemy,() => placeOnScreen("robot"));
                break;

            case "ring":
                const ring = spawnCoin(k.vec2(1950, 780));
                ring.onUpdate(() => {
                    ring.move(-(gameSpeed), 0);
                    return;
                });

                ring.onExitScreen(() => {
                    if (ring.pos.x < 0) k.destroy(ring);
                });
                
                k.wait(waitTimeCoin,() => placeOnScreen("ring"));
                break;
        };
    };

    placeOnScreen("robot");
    placeOnScreen("ring");

    k.add([
        k.rect(1920,300),
        k.opacity(0),
        k.pos(0, 830),
        k.area(),
        k.body({isStatic: true})
    ]);

    k.onUpdate(() => {
        if (spark.isGrounded()) scoreMultiplier = 0;

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

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });
};
