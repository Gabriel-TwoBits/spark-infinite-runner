import k from "../kaplayCtx"

export default function spawnSpark(pos){
    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    const spark = k.add([
        k.sprite("spark", {anim: "run"}),
        k.scale(4.2),
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 35, 40) }),
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce: 1700}),
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
                        k.play("jump");
                    }else{
                        this.isAttacking = true;
                        this.vel.y = 1500
                        k.wait(0.3, () => this.isAttacking = false);
                        this.use(k.sprite("spark_attack"));
                        k.play("air-slash");
                        this.play("attack");
                    };
                });
            },
            setEvents(){
                this.onGround(() => {
                    if(gameSpeed < 1500){
                        this.isAttacking = false;
                        this.use(k.sprite("spark_walk"));
                        this.play("walk");
                    }else{
                        this.isAttacking = false;
                        this.use(k.sprite("spark"));
                        this.play("run");
                    };
                });
            },
        },
    ]);

    spark.ringCollectUI = spark.add([
        k.text("", {font: "mania", size:24}),
        k.color("FF8000"),
        k.anchor("center"),
        k.pos(30, -10),
    ]);

    return spark;
};