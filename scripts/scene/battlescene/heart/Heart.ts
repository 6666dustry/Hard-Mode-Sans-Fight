import type BattleScene from "scene/battlescene/BattleScene.js";
import type Director from "../director/Director.js";
import type { HeartColor, SetHeartPos, HeartDirection, setColor, AllReadonly, } from "../../../Types.js";
import Keys from "../../../keys.js";
import redMovement from "./redMovement.js";
import setGravity from "./setGravity.js";
import setDirection from "./setDirection.js";
import touching from "./touching.js";
import isFalling from "./blue/isFalling.js";
import update from "./update.js";
import isMoving from "./isMoving.js";
import maxSpeed from "./maxSpeed.js";
import getPosition from "./getPosition.js";
import router from "./router.js";
import checkType from "../checkType.js";
import Base from "../director/Base.js";
import Blue from "./blue/blue.js";
export default class Heart extends Base(class { }) {
    constructor(scene: BattleScene, collide: number, director: Director) {
        super();
        this.BaseConstructor(scene, director);
        this.collide = collide;

        this.color = "red";

        this.gravityDirection = "down";
        this.slamming = false;
        this.colliding = false;
        this.Force = {
            x: 0, y: 0
        };
        this.Image = this.scene.matter.add.image(0, 0, Keys.Image.heart);

        this.Image.setDepth(Keys.Depth.heart);
        this.Image.setFriction(0, 0, 0);
        this.Image.setMass(Keys.MASS);
        this.Image.setBounce(0);
        this.Image.setIgnoreGravity(true);
        this.normalSpeed = 3;
        this.slowSpeed = 1;

        this.collidingAt = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };

        this.redMovement = redMovement;
        this.setGravity = setGravity;
        this.setDirection = setDirection;
        this.touching = touching;
        this.maxSpeed = maxSpeed;
        this.getPosition = getPosition;
        this.router = router;
        this.update = update;

        this.Image.setCollisionCategory(collide);
        this.Image.setOnCollideActive(this.touching.bind(this));
        this.Image.setOnCollideEnd(this.notTouching.bind(this));
        (this.Image.body as MatterJS.BodyType).label = Keys.Label.heart;

        this.Blue = new Blue(scene, director, this);
    };
    /**heart collide category */
    readonly collide: number;
    readonly normalSpeed: number;
    readonly slowSpeed: number;
    collidingAt: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    /**heart color. */
    color: HeartColor;
    Image: Phaser.Physics.Matter.Image;
    gravityDirection: HeartDirection;
    slamming: boolean;
    Force: {
        x: number;
        y: number;
    };

    colliding: keyof typeof Keys.Label | false;
    Blue: Blue;
    readonly redMovement: typeof redMovement;
    readonly setGravity: typeof setGravity;
    readonly setDirection: typeof setDirection;
    readonly touching: typeof touching;
    readonly maxSpeed: typeof maxSpeed;
    readonly update: typeof update;
    readonly getPosition: typeof getPosition;
    readonly router: typeof router;

    public get moving(): boolean {
        return isMoving.call(this);
    }
    public get Edge(): Phaser.Math.Vector2 {
        let result = new Phaser.Math.Vector2(this.Image.x, this.Image.y + this.Image.displayHeight / 2);
        return result;
    }

    notTouching(): void {
        this.Blue.notTouching();
        this.colliding = false;
        this.collidingAt = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
    }
    setColor(config: AllReadonly<setColor>): void {
        const DATA = checkType(config, {
            color: "string",
            playSound: {
                type: "boolean",
                default: false
            }
        }, this.director.AttackLoader.runAttackPos);
        this.color = DATA.color;
        //this.canJump = false;
        if (DATA.playSound) {
            this.scene.sound.play(Keys.Audio.ding);
        }
    }
    setPosition(config: AllReadonly<SetHeartPos>): void {
        const DATA = checkType(config, {
            x: {
                type: ["number", "boolean"],
                default: false
            },
            y: {
                type: ["number", "boolean"],
                default: false
            },
            duration: {
                type: ["number", "boolean"],
                default: false
            },
        }, this.director.AttackLoader.runAttackPos);
        const X: number | false = DATA.x,
            Y: number | false = DATA.y;

        if (typeof DATA.duration === "number" && DATA.duration > 0) {
            if (X !== false && Y !== false) {
                this.scene.tweens.add({
                    targets: this.Image,
                    props: {
                        x: X,
                        y: Y
                    },
                    duration: DATA.duration
                });
            } else {
                if (X !== false) {
                    this.scene.tweens.add({
                        targets: this.Image,
                        props: {
                            x: X,
                        },
                        duration: DATA.duration
                    });
                }
                if (Y !== false) {
                    this.scene.tweens.add({
                        targets: this.Image,
                        props: {
                            x: Y,
                        },
                        duration: DATA.duration
                    });
                }
            }
        } else {
            if (X !== false) {
                this.Image.x = X;
            }
            if (Y !== false) {
                this.Image.y = Y;
            }
        }
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
    enemyTurnInit(): void {
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
};