import k from "../kaplayCtx"

export default function spawnSpark(pos){
    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    const spark = k.add([
        k.sprite("spark", {anim: "run"}),
        k.scale(4.2),
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 40, 40) }),
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce: 2000}),
        "player",
        {
            isAttacking: false,
            ringCollectUI: null,
            setControls(){
                k.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        this.use(k.sprite("spark_jump"));
                        this.play("jump");
                        this.jump();
                        k.play("jump", {volume: 0.5});
                    }else{
                        this.isAttacking = true;
                        k.wait(0.5, () => this.isAttacking = false);
                        this.use(k.sprite("spark_attack"));
                        this.play("attack");
                    };
                });
            },
            setEvents(){
                this.onGround(() => {
                    if(gameSpeed < 1500){
                        this.use(k.sprite("spark_walk"));
                        this.play("walk");
                    }else{
                        this.use(k.sprite("spark"));
                        this.play("run");
                    }
                })
            },
        },
    ]);

    spark.ringCollectUI = spark.add([
        k.text("", {font: "mania", size:24}),
        k.color(255, 185, 100),
        k.anchor("center"),
        k.pos(30, -10),
    ]);

    return spark;
};