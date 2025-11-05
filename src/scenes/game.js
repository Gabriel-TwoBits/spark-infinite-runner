import k from "../kaplayCtx";
import spawnSpark from "../entities/spark";
import {spawnMotoBug} from "../entities/motobug";
import spawnRing from "../entities/ring";

export default function game(isPlaying){
    k.setGravity(4000);

    let stage
    if (!isPlaying) {
        stage = k.play("stage", {volume: 0.2, loop: true});
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

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });
    let score = 0;
    let scoreMultiplier = 0;

    const scoreText = k.add([
        k.text("SCORE: 0", {font: "mania", size: 72}),
        k.pos(20, 20),
    ]);

    const spark = spawnSpark(k.vec2(200, 800));
    spark.setControls();
    spark.setEvents();
    spark.onCollide("enemy", (enemy) => {
        if (!spark.isGrounded() && spark.isAttacking){
            k.play("destroy", {volume: 0.5});
            k.play ("hyper-ring", {volume: 0.5});
            k.destroy(enemy);

            //spark.play("jump");
            spark.jump();

            scoreMultiplier++;
            score += 10* scoreMultiplier;
            scoreText.text = `SCORE: ${score}`;

            if(scoreMultiplier === 1){
                spark.ringCollectUI.text = "+10";
            }
            else{
                spark.ringCollectUI.text = `x${scoreMultiplier}`;
            }
            
            k.wait(1, () => spark.ringCollectUI.text = "");

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
        scoreText.text = `SCORE: ${score}`;

        spark.ringCollectUI.text = "+1";
        k.wait(1, () => spark.ringCollectUI.text = "");
        return;
    });

    const placeOnScreen = (type) => {
        const waitTime = k.rand(0.5, 2.5);

        switch(type){
            case "motobug":
                const motobug = spawnMotoBug(k.vec2(1950, 780));
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

                k.wait(waitTime,() => placeOnScreen("motobug"));
                break;

            case "ring":
                const ring = spawnRing(k.vec2(1950, 780));
                ring.onUpdate(() => {
                    ring.move(-(gameSpeed), 0);
                    return;
                });

                ring.onExitScreen(() => {
                    if (ring.pos.x < 0) k.destroy(ring);
                });
                
                k.wait(waitTime,() => placeOnScreen("ring"));
                break;
        };
    };

    placeOnScreen("motobug");
    placeOnScreen("ring");

    k.add([
        k.rect(1920,300),
        k.opacity(0),
        k.pos(0, 835),
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
