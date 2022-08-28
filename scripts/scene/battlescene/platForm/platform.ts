import BattleScene from "../BattleScene.js";
import { AllReadonly, AnchorConfig, PlatFormSingleConfig, Pos2 } from "../../../Types.js";
import Keys from "../../../keys.js";
import BoxNinePatch from "./boxNinePatch.js";
import update from "./platformUpdate.js";
import getAnchoredPos from "../getAnchoredPos.js";
import type Director from "../director/Director.js";
import setTarget from "../setTween.js";
import checkType from "../checkType.js";
export default class PlatForm extends Phaser.GameObjects.Container {
    constructor(scene: BattleScene, config: AllReadonly<PlatFormSingleConfig>,
        collision: number,
        heartCol: number, type?: string, ignoreWarn?: {
            [k: string]: boolean;
        }) {

        super(scene, 0, 0);

        this.collision = collision;
        this.heartCol = heartCol;
        this.director = scene.director;
        const DATA = checkType(config, {
            x: {
                type: "number",
                default: 0
            },
            y: {
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
            speed: {
                type: "number",
                default: 0
            },
            speedAngle: {
                type: "number",
                default: 0
            },
            color: {
                type: ["string", "number"],
                default: 0
            },
            anchor: {
                type: "object",
                default: {
                    x: "bottom"
                }
            },
            visible: {
                type: "boolean",
                default: false
            },
            length: {
                type: "number",
                default: 30
            },
            lifetime: {
                type: ["number", "boolean",],
                default: false
            },
            tween: {
                type: "object",
                default: undefined
            },
            tweenAnchor: {
                type: "string",
                default: "middle"
            }
        }, this.director.AttackLoader.runAttackPos, ignoreWarn);

        this.speed = DATA.speed;
        this.speedAngle = DATA.speedAngle;
        this.spin = DATA.spin;

        this.tweenAnchor = DATA.tweenAnchor;

        this.platLength = DATA.length;
        this.oldLength = this.platLength;
        this.destroyed = false;


        if (typeof DATA.color === "number") {
            this.color = DATA.color;
        } else {

            switch (DATA.color) {
                case "green":
                    this.color = 0;
                    break;

                case "purple":
                    this.color = 1;
                    break;
            }
        }

        this.Scaffold = new BoxNinePatch(scene, {
            x: 0,
            y: 0,
            length: this.platLength,
        });

        this.Zone = new BoxNinePatch(scene, {
            x: 0,
            y: -4,
            length: this.platLength,
            tint: Keys.Color[this.colorKey],
        });

        scene.add.existing(this);
        this.add(this.Scaffold);
        this.add(this.Zone);

        this.setDepth(Keys.Depth.debug);
        this.setSize(this.platLength, this.Scaffold.Middle.displayHeight);

        //add matter body.
        this.MatterObject = scene.matter.add.gameObject(this) as Phaser.Physics.Matter.Image;

        //#collision region 
        this.MatterObject.setCollisionCategory(collision);
        this.MatterObject.setCollidesWith(0);
        this.MatterObject.setStatic(true);
        this.MatterObject.setBounce(0);
        //#endregion

        //#body state region 
        this.MatterObject.setFrictionAir(0);
        this.MatterObject.setMass(Keys.MASS);
        this.MatterObject.setStatic(true);

        (this.MatterObject.body as MatterJS.BodyType).label = Keys.Label.platform;

        let AnchorConfig: AnchorConfig = {
            x: DATA.x,
            y: DATA.y,
            anchor: DATA.anchor,
            width: this.platLength,
            height: this.Scaffold.Middle.displayHeight,
            angle: DATA.angle
        };

        let newPos = getAnchoredPos(AnchorConfig, true);

        this.setPosition(newPos.x, newPos.y);

        this.setAngle(DATA.angle);
        this.oldAngle = this.angle;

        if (DATA.tween) {

            setTarget(scene, this, DATA.tween, {
                length: "platLength"
            });
        }

        if (typeof DATA.lifetime === "number") {
            scene.time.delayedCall(DATA.lifetime, () => {

                scene.tweens.killTweensOf(this);
                this.removeAll(true);
                this.destroy();

            }, undefined, this);
        }

        this.oldPosition = {
            x: this.x, y: this.y
        };

        if (!DATA.visible) {
            this.director.CombatzoneDirector.draws.push(this);

            this.visible = false;
            this.onRender = true;
        } else {
            this.onRender = false;
        }

        this.update = update;
    }
    declare scene: BattleScene;
    declare body: MatterJS.BodyType;
    readonly heartCol: number;
    readonly collision: number;
    readonly director: Director;
    /**0 is green, 1 is purple */
    color: 0 | 1;
    spin: number;
    speed: number;
    speedAngle: number;
    tweenAnchor: NonNullable<PlatFormSingleConfig["tweenAnchor"]>;
    oldAngle: PlatForm["angle"];
    oldPosition: Pos2;
    platLength: number;
    oldLength: PlatForm["platLength"];
    destroyed: boolean;
    onRender: boolean;
    readonly Scaffold: BoxNinePatch;
    readonly Zone: BoxNinePatch;
    readonly MatterObject: Phaser.Physics.Matter.Image;

    public get colorKey(): "green" | "purple" {
        let v: "green" | "purple";
        switch (this.color) {
            case 0:
                v = "green";
                break;
            case 1:
                v = "purple";
                break;
        }
        return v;
    }
    public set colorKey(v: "green" | "purple" | 0 | 1) {
        if (typeof v === "number") {
            this.color = 2 % Math.floor(v) as 0 | 1;
        } else {
            switch (v) {
                case "green":
                    this.color = 0;
                    break;

                case "purple":
                    this.color = 1;
                    break;
            }
        }
        switch (this.color) {
            case 0:
                this.Zone.setTint(Keys.Color.green);
                break;
            case 1:
                this.Zone.setTint(Keys.Color.purple);
                break;
        }
    }
    destroy(fromScene?: boolean | undefined): void {
        if (!this.scene) {
            return;
        }
        this.scene.tweens.killTweensOf(this);
        super.destroy(fromScene);
    }

    update: typeof update;
}