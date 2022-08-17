import BattleScene from "../BattleScene.js";
import { AllReadonly, Anchor, AnchorConfig, PlatFormSingleConfig, Pos2 } from "../../../Types.js";
import Keys from "../../../keys.js";
import BoxNinePatch from "./boxNinePatch.js";
import update from "./platformUpdate.js";
import getAnchoredPos from "../getAnchoredPos.js";
import type Director from "../director/Director.js";
import setTarget from "../setTween.js";
export default class PlatForm extends Phaser.GameObjects.Container {
    constructor(scene: BattleScene, config: AllReadonly<PlatFormSingleConfig>,
        collision: number,
        heartCol: number) {

        super(scene, 0, 0);

        this.collision = collision;
        this.heartCol = heartCol;
        this.director = scene.director;

        this.speed = config.speed || 0;
        this.speedAngle = config.speedAngle || 0;
        this.spin = config.spin || 0;

        this.tweenAnchor = config.tweenAnchor || "middle";

        this.platLength = config.length || 30;
        this.oldLength = this.platLength;
        this.destroyed = false;

        if (config.color) {
            if (typeof config.color === "number") {
                this.color = config.color;
            } else {

                switch (config.color) {
                    case "green":
                        this.color = 0;
                        break;

                    case "purple":
                        this.color = 1;
                        break;
                }
            }

        } else {
            //default value.
            this.color = 0;
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
            x: config.x || 0,
            y: config.y || 0,
            anchor: config.anchor,
            width: this.platLength,
            height: this.Scaffold.Middle.displayHeight,
            angle: config.angle
        };

        let newPos = getAnchoredPos(AnchorConfig, true);

        this.setPosition(newPos.x, newPos.y);

        this.setAngle(config.angle);
        this.oldAngle = this.angle;

        if (config.tween) {

            setTarget(scene, this, config.tween, {
                length: "platLength"
            });
        }

        if (typeof config.lifetime === "number" && config.lifetime !== Infinity) {
            scene.time.delayedCall(config.lifetime, () => {

                scene.tweens.killTweensOf(this);
                this.removeAll(true);
                this.destroy();

            }, undefined, this);
        }

        this.oldPosition = {
            x: this.x, y: this.y
        };

        if (!config.visible) {
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
    oldAngle: number;
    oldPosition: Pos2;
    platLength: number;
    oldLength: number;
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

    update: typeof update;
}