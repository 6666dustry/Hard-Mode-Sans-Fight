import BattleScene from "../../BattleScene.js";
import Bone from "../bone.js";
import { AllReadonly, BoneConfig, CircleBoneConfig } from "../../../../Types.js";
import makeDeepCopy from "../../makeDeepCopy.js";
import BoneDirector from "../BoneDirector.js";
import update from "./update.js";
import Keys from "../../../../keys.js";
import getPadding from "./getPadding.js";
import { gameDebug } from "../../../../main.js";
import setTarget from "../../setTween.js";
import checkType from "../../checkType.js";
export default class CircleBone extends Phaser.GameObjects.Zone {
    constructor(scene: BattleScene, config: AllReadonly<CircleBoneConfig>, BoneDirector: BoneDirector) {
        super(scene, config.x || 0, config.y || 0);
        scene.add.existing(this);

        this.BoneDirector = BoneDirector;

        const DATA = checkType(config, {
            x: {
                type: "number",
                default: 0
            },
            y: {
                type: "number",
                default: 0
            },
            spaceRadius: {
                type: "number",
                default: 30
            },
            boneRadius: {
                type: "number",
                default: 30
            },
            count: {
                type: ["number", "string"],
                default: 4
            },
            startAngle: {
                type: "number",
                default: 0
            },
            padding: {
                type: ["number", "string"],
                default: "equal"
            },
            rotateSpeed: {
                type: "number",
                default: 1
            },
            tween: {
                type: ["object", "boolean"],
                default: false
            },
            boneConfig: {
                type: ["object", "boolean"],
                default: false
            },
            stepAngle: {
                type: "boolean",
                default: true
            }
        }, this.BoneDirector.director.AttackLoader.runAttackPos);


        this.spaceRadius = DATA.spaceRadius;
        this.boneRadius = DATA.boneRadius;

        this.count = DATA.count;

        this.startAngle = DATA.startAngle;
        this.padding = DATA.padding;
        this.rotateSpeed = DATA.rotateSpeed;

        this.getPadding = getPadding;

        //debug.
        if (gameDebug) {
            this.middlePoint = scene.add.graphics({
                x: this.x,
                y: this.y,
                fillStyle: { color: 0x00ff00 }
            });
            this.middlePoint.setDepth(Keys.Depth.debug);
            this.middlePoint.fillRect(0, 0, 3, 3);
            this.angleLine = scene.add.line(this.x, this.y, this.x, this.y).setOrigin(0);

            this.angleLine.setAngle(this.angle);
        }

        if (DATA.boneConfig) {
            this.Config = makeDeepCopy(config.boneConfig);
        } else {
            this.Config = {
                x: 0,
                y: 0,
                anchor: {
                    x: "middle",
                    y: "middle"
                }
            };
        }

        this.Config.angle = this.Config.angle || 0;

        let BonePos = new Phaser.Math.Vector2(0, (this.boneRadius / 2 + this.spaceRadius));

        BonePos.rotate(Phaser.Math.DegToRad(this.startAngle));

        this.Config.angle += this.startAngle;

        if (this.Config.length) {
            this.lockLength = true;
        } else {
            this.lockLength = false;
            this.Config.length = this.boneRadius;
        }

        if (this.count === "single") {
            this.Config.x = BonePos.x + this.x;
            this.Config.y = BonePos.y + this.y;
            let Bone = BoneDirector.addSingle(this.Config);
            Bone.once("destroy", () => {
                this.Bones = [];
            });
            this.Bones = [Bone];
        } else {

            this.Bones = [];
            for (let index = 0; index < this.count; index++) {
                this.Config.x = BonePos.x + this.x;
                this.Config.y = BonePos.y + this.y;
                let Bone = BoneDirector.addSingle(this.Config);
                let len = this.Bones.length - 1;

                Bone.once("destroy", () => {
                    this.Bones.splice(len, 1);
                });

                this.Bones.push(Bone);
                BonePos.rotate(Phaser.Math.DegToRad(this.getPadding()));

                if (DATA.stepAngle) {
                    this.Config.angle += this.getPadding();
                }
            }
        }

        if (DATA.tween) {
            setTarget(scene, this, DATA.tween);
        }
        this.setPosition(DATA.x, DATA.y);

        this.oldAngle = this.startAngle;
        this.oldX = this.x;
        this.oldY = this.y;
        this.update = update;
    }

    public set centerX(v: number) {
        for (const iterator of this.Bones) {
            iterator.x += v - this.x;
        }
        this.x = v;
    }
    public set centerY(v: number) {
        for (const iterator of this.Bones) {
            iterator.y += v - this.y;
        }
        this.y = v;
    }

    public get centerX(): number {
        return this.x;
    }
    public get centerY(): number {
        return this.y;
    }


    declare scene: BattleScene;
    readonly BoneDirector: BoneDirector;
    boneRadius: number;
    spaceRadius: number;
    count: NonNullable<CircleBoneConfig["count"]>;
    startAngle: number;
    padding: NonNullable<CircleBoneConfig["padding"]>;
    rotateSpeed: number;
    Config: BoneConfig;
    Bones: Bone[];
    middlePoint?: Phaser.GameObjects.Graphics;
    angleLine?: Phaser.GameObjects.Line;
    oldX: Bone["x"];
    oldY: Bone["y"];
    oldAngle: Bone["angle"];
    lockLength: boolean;
    getPadding: typeof getPadding;
    destroy(fromScene?: boolean) {
        if (this.middlePoint) {
            this.middlePoint.clear();
            this.middlePoint.destroy();
        }
        for (const iterator of this.Bones) {
            if (!iterator.destroyed) {
                iterator.destroy(fromScene);
            }
        }
        if (this.scene) {
            this.scene.tweens.killTweensOf(this);
        }
        super.destroy(fromScene);
    }
}