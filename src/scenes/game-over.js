import k from "../kaplayCtx";

export default function gameOver(){
    const text = k.add([
        k.text("gameover bobaum", {font: "mania", size: 92}),
        k.anchor("center"),
        k.pos(k.center()),
    ]);

    k.onButtonPress("jump", () => {
        k.go("game");
    });
};