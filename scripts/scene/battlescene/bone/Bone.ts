import BattleScene from "scene/battlescene/BattleScene.js";
import Keys from "../../../keys.js";
import Director from "../director/Director.js";
import type { Image, BoneConfig, Anchor, AnchorConfig, AllReadonly } from "../../../Types.js";
import update from "./BoneUpdate.js";
import deleteTween from "./deleteTween.js";
import spawnTween from "./spawnTween.js";
import getAnchoredPos from "../getAnchoredPos.js";
import Bullet from "../bullet/bullet.js";
import setTween from "../setTween.js";
import checkType from "../checkType.js";

export default class Bone extends Bullet {
    constructor(scene: BattleScene, config: AllReadonly<BoneConfig>, collision: number, director: Director, moveType?: Bone["moveType"], ignoreWarn?: {
        [k: string]: boolean;
    }) {
        //set config
        const DATA = checkType(config, {
            x: {
                type: "number",
                default: 0
            },
            y: {
                type: "number",
                default: 0
            },
            speed: {
                type: "number",
                default: 0
            },
            speedAngle: {
                type: "number",
                default: 0
            },
            angle: {
                type: "number",
                default: 0
            },
            spin: {
                type: "number",
                default: 0
            },
            visible: {
                type: "boolean",
                default: false
            },
            length: {
                type: "number",
                default: 12
            },
            spawnTween: {
                type: ["boolean", "object"],
                default: false
            },
            deleteTween: {
                type: ["boolean", "object"],
                default: false
            },
            sound: {
                type: ["string", "boolean"],
                default: false
            },
            color: {
                type: ["string", "number"],
                default: 0
            },
            tweenAnchor: {
                type: "string",
                default: "middle"
            },
            tween: {
                type: ["object", "boolean"],
                default: false
            },
            anchor: {
                type: "object",
                default: {
                    x: "bottom",
                    y: "bottom"
                }
            },
            lifetime: {
                type: ["number", "boolean"],
                default: false
            }
        }, director.AttackLoader.runAttackPos, ignoreWarn);

        super(scene, director,
            config.color);

        this.spin = DATA.spin;

        this.speed = DATA.speed;
        this.speedAngle = DATA.speedAngle;

        this.moveType = moveType || "normal";
        this.deleteTweenType =
            DATA.deleteTween;

        this.spawnTweenType = DATA.spawnTween;

        this.state = "appear";

        this.tweenAnchor = DATA.tweenAnchor;

        this.collision = collision;

        this.deleteTween = deleteTween;
        this.spawnTween = spawnTween;

        //middle.
        this.middle = scene.add.sprite(0, 0,
            Keys.Image.bone, 1);
        //top.
        this.top = scene.add.image(0,
            0,
            Keys.Image.bone, 0);


        //bottom.
        this.bottom = scene.add.image(0,
            0, Keys.Image.bone, 3);


        const PADDING = this.top.displayHeight + this.bottom.displayHeight;

        this.displayLength = config.length || PADDING;
        this.oldLength = this.displayLength;

        if (Math.abs(this.displayLength) <= Math.abs(PADDING)) {
            this.boneLength = 1;
            this.displayLength = PADDING;
        } else {
            this.boneLength = this.displayLength - PADDING;
        }

        this.middle.displayHeight = this.boneLength;

        this.top.setPosition(0, -(this.middle.displayHeight / 2) - this.top.displayHeight / 2);

        this.bottom.setPosition(0, (this.middle.displayHeight / 2) + this.bottom.displayHeight / 2);


        //add container.
        this.add([this.top, this.middle, this.bottom]);

        const WIDTH = this.middle.displayWidth;
        let AnchorConfig: AnchorConfig = {
            x: DATA.x,
            y: DATA.y,
            width: WIDTH,
            height: this.displayLength,
            anchor: DATA.anchor,
            angle: DATA.angle
        };

        let newPos = getAnchoredPos(AnchorConfig, true);

        this.setPosition(newPos.x, newPos.y);

        this.spawnTween(this.spawnTweenType);


        scene.add.existing(this);


        this.setSize(WIDTH * 0.2, this.boneLength);

        //add matter body.
        this.MatterObject = scene.matter.add.gameObject(this) as Phaser.Physics.Matter.Image;
        //#collision region 
        this.MatterObject.setCollisionCategory(collision);
        this.MatterObject.setCollidesWith(0);
        //#endregion

        //#body state region 
        this.MatterObject.setFrictionAir(0);

        this.MatterObject.setMass(Keys.MASS);
        this.MatterObject.setIgnoreGravity(true);
        //#endregion

        //#rotate region 
        this.setAngle(DATA.angle);

        if (DATA.sound) {
            this.scene.sound.play(Keys.Audio[DATA.sound]);
        }

        this.tints = [this.top, this.middle, this.bottom];
        this.colorKey = config.color || "white";
        this.oldAngle = this.angle;
        this.oldColor = this.color;

        if (DATA.lifetime && DATA.lifetime !== Infinity) {
            //set lifetime
            this.scene.time.delayedCall(DATA.lifetime, this.deleteTween, [this.deleteTweenType], this);
        }

        if (!DATA.visible) {
            if (this.state !== "appear") {
                this.director.CombatzoneDirector.draws.push(this);
                this.onRender = true;
            }
            this.visible = false;
            this.onRender = false;
        } else {
            this.onRender = false;
        }

        this.destroyed = false;

        //add tween. can multiple
        if (DATA.tween) {
            setTween(scene, this, DATA.tween, {
                length: "displayLength"
            });
        }
    }
    moveType: "normal" | "stab" | "circle" | "menu";
    collision: number;
    state: "appear" | "living" | "dying";
    oldColor: typeof this.color;
    top: Image;
    middle: Phaser.GameObjects.Sprite;
    bottom: Image;
    /**this is just hit box length. please change displayLength instead of boneLength*/
    boneLength: number;
    displayLength: number;
    /**used for check changed length. */
    oldLength: number;
    speed: number;
    speedAngle: number;
    tweenAnchor: NonNullable<BoneConfig["tweenAnchor"]>;
    spawnTweenType: BoneConfig["spawnTween"];
    deleteTweenType: BoneConfig["deleteTween"];
    spin: number;
    destroyed: boolean;
    onRender: boolean;
    oldAngle: number;
    readonly MatterObject: Phaser.Physics.Matter.Image;
    readonly deleteTween: typeof deleteTween;
    readonly spawnTween: typeof spawnTween;
    update() {
        update.call(this);
        if (this.moveType === "menu") {
            this.checkTakeDamage(this.body, false, true);
        } else {
            super.update();
        }
    }
    destroy(fromScene?: boolean | undefined): void {
        if (this.scene && this.scene.sys && this.scene.sys.displayList) {
            this.scene.tweens.killTweensOf(this);
            super.destroy(false);
        }
        this.destroyed = true;
    }
}