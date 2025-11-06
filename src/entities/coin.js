import k from "../kaplayCtx";

export default function spawnCoin(pos){
    return k.add([
        k.sprite("ring", {anim: "spin"}),
        k.area(),
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "ring",
    ]);
};