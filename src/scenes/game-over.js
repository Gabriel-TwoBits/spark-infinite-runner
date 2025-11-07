import k from "../kaplayCtx";
import { T } from "./language-menu.js";

export default function gameOver(){
    let bestScore = k.getData("best-score");
    const currentScore = k.getData("current-score");

    const rankGrades = ["RANK F", "RANK E", "RANK D", "RANK C", "RANK B", "RANK A", "RANK S"];
    const rankValues = [50, 80, 100, 200, 300, 400, 500];

    let currentRank = "RANK F";
    let bestRank = "RANK F";

    for(let i = 0; i < rankValues.length; i++){
        if(rankValues[i] < currentScore) currentRank = rankGrades[i];
        if(rankValues[i] < bestScore) bestRank = rankGrades[i];
    }

    if(bestScore < currentScore){
        k.setData("best-score", currentScore);
        bestScore = currentScore;
        bestRank = currentRank;
    }

    k.add([
        k.sprite("spark-art", {flipX: true}),
        k.pos(200, 720),
        k.anchor("center"),
        k.scale(2),
        k.z(1),
    ])

    k.onDraw(() => {
        k.drawSprite({
            sprite: "boss-bg",
            pos: k.vec2(0, 0),
            z: -2,
        })
    })

    k.add([
        k.text(T("game-over"), {font: "mania", size: 100}),
        k.anchor("center"),
        k.pos(k.center().x, 150),
        "localized",
        { translationKey: "game-over" },
    ]);

    k.add([
        k.text(T("best-score-text"), {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 275),
        "localized",
        { translationKey: "best-score-text" },
    ]);

    k.add([
        k.text(`${bestScore}`, {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 200),
    ]);

    k.add([
        k.text(T("current-score-text"), {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 275),
        "localized",
        { translationKey: "current-score-text" },
    ]);

    k.add([
        k.text(`${currentScore}`, {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 200),
    ]);

    const bestRankBox = k.add([
        k.rect(400, 400, {radius: 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y + 50),
        k.z(2)
    ]);

    bestRankBox.add([
        k.text(bestRank, {font: "mania", size: 100}),
        k.anchor("center"),
    ]);

    const bestScoreBox = k.add([
        k.rect(400, 400, {radius: 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y + 50),
    ]);

    bestScoreBox.add([
        k.text(currentRank, {font: "mania", size: 100}),
        k.anchor("center"),
    ]);

    k.wait(1, () => {
        k.add([
            k.text(T("space-to-play-again"), {font: "mania", size: 64}),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 350),
            k.z(1),
            "localized",
            { translationKey: "space-to-play-again" }
        ]);

        k.onButtonPress("jump", () => k.go("game", { isPlaying: true }))
    });
};