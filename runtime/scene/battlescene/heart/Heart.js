import Keys from "../../../keys.js";
import blueMovement from "./blueMovement.js";
import redMovement from "./redMovement.js";
import setGravity from "./setGravity.js";
import setDirection from "./setDirection.js";
import touching from "./touching.js";
import isFalling from "./isFalling.js";
import onGravity from "./onGravity.js";
import onJump from "./onJump.js";
import update from "./update.js";
import isMoving from "./isMoving.js";
import setCollisionGravity from "./setCollisionGravity.js";
import maxSpeed from "./maxSpeed.js";
import getPosition from "./getPosition.js";
import router from "./router.js";
/**
 * attack turn heart movement systems.
 */
class Heart {
    /**
     *
     * @param SCENE BattleScene reference.
     * @param collide heart collide category reference.
     * @param OPERATOR Operator reference.
     */
    constructor(SCENE, collide, OPERATOR) {
        this.scene = SCENE;
        this.collide = collide;
        this.director = OPERATOR;
        this.canJump = false;
        this.color = "red";
        this.gravityDirection = "down";
        this.slamming = false;
        this.colliding = false;
        this.Force = {
            x: 0, y: 0
        };
        this.jumped = false;
        this.Image = this.scene.matter.add.image(0, 0, Keys.Image.heart);
        this.Image.setDepth(Keys.Depth.heart);
        this.Image.setFriction(0, 0, 0);
        this.Image.setMass(Keys.MASS);
        this.Image.setBounce(0);
        this.Image.setIgnoreGravity(true);
        this.jumpTime = 0;
        this.jumping = false;
        this.moveWithPlatform = false;
        this.normalSpeed = 3;
        this.slowSpeed = 1;
        this.collidingAt = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
        this.blueMovement = blueMovement;
        this.redMovement = redMovement;
        this.setGravity = setGravity;
        this.setDirection = setDirection;
        this.touching = touching;
        this.onGravity = onGravity;
        this.onJump = onJump;
        this.setCollisionGravity = setCollisionGravity;
        this.maxSpeed = maxSpeed;
        this.getPosition = getPosition;
        this.router = router;
        this.update = update;
        this.Image.setCollisionCategory(collide);
        this.Image.setOnCollideActive(this.touching.bind(this));
        this.Image.setOnCollideEnd(this.notTouching.bind(this));
        this.Image.body.label = Keys.Label.heart;
    }
    ;
    scene;
    /**heart collide category */
    collide;
    director;
    normalSpeed;
    slowSpeed;
    collidingAt;
    moveWithPlatform;
    /**heart color. */
    color;
    Image;
    /** is this touch scaffold */
    canJump;
    jumped;
    jumping;
    jumpTime;
    gravityDirection;
    slamming;
    Force;
    colliding;
    blueMovement;
    redMovement;
    setGravity;
    setDirection;
    touching;
    onGravity;
    onJump;
    setCollisionGravity;
    maxSpeed;
    update;
    getPosition;
    router;
    get isFalling() {
        return isFalling.call(this);
    }
    get moving() {
        return isMoving.call(this);
    }
    get ImageSize() {
        let result = new Phaser.Geom.Rectangle();
        result.width = this.Image.displayWidth;
        result.height = this.Image.displayHeight;
        result.centerX = this.Image.x;
        result.centerY = this.Image.y;
        return result;
    }
    get Edge() {
        let result = new Phaser.Math.Vector2(this.Image.x, this.Image.y + this.Image.displayHeight / 2);
        return result;
    }
    notTouching() {
        this.canJump = false;
        this.colliding = false;
        if (!this.jumping) {
            this.jumpTime = 0;
        }
        this.collidingAt = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
    }
    setColor(config) {
        this.color = config.color;
        this.canJump = false;
        if (config.playSound) {
            this.scene.sound.play(Keys.Audio.ding);
        }
    }
    setPosition(config) {
        const X = config.x, Y = config.y;
        if (config.duration) {
            if (X && Y) {
                this.scene.tweens.add({
                    targets: this.Image,
                    props: {
                        x: X,
                        y: Y
                    },
                    duration: config.duration
                });
            }
            else {
                if (X) {
                    this.scene.tweens.add({
                        targets: this.Image,
                        props: {
                            x: X,
                        },
                        duration: config.duration
                    });
                }
                if (Y) {
                    this.scene.tweens.add({
                        targets: this.Image,
                        props: {
                            x: Y,
                        },
                        duration: config.duration
                    });
                }
            }
        }
        else
            this.Image.setPosition(X, Y);
    }
    playerTurnInit() {
        this.setColor({
            color: "red"
        });
        this.gravityDirection = "down";
        this.Image.setTint(0xff0000);
        this.Force = { x: 0, y: 0 };
        this.Image.setVelocity(0);
        this.Image.setAngularVelocity(0);
        if (!this.Image.isStatic()) {
            this.Image.setStatic(true);
        }
    }
    enemyTurnInit() {
        this.setColor({
            color: "red"
        });
        this.gravityDirection = "down";
        if (!this.Image.visible) {
            this.Image.setVisible(true);
        }
        this.Image.setPosition(320, 300);
        if (this.Image.isStatic()) {
            this.Image.setStatic(false);
        }
    }
    updateVelocity() {
        this.Image.setVelocity(this.Force.x, this.Force.y);
    }
}
;
export default Heart;
//# sourceMappingURL=Heart.js.map