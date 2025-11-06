import k from "../kaplayCtx";

export function spawnRobot(pos){
    return k.add([
        k.sprite("motobug", {anim: "run"}),
        k.area({ shape: new k.Rect(k.vec2(-3, 0), 500, 500) }),
        k.scale(0.2),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "enemy",
    ]);
};