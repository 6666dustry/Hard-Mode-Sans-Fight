import Keys from "../../../keys.js";
import BoxNinePatch from "./boxNinePatch.js";
import update from "./platformUpdate.js";
import getAnchoredPos from "../getAnchoredPos.js";
import setTarget from "../setTween.js";
import checkType from "../checkType.js";
export default class PlatForm extends Phaser.GameObjects.Container {
    constructor(scene, config, collision, heartCol, type, ignoreWarn) {
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
        }
        else {
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
        this.MatterObject = scene.matter.add.gameObject(this);
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
        this.MatterObject.body.label = Keys.Label.platform;
        let AnchorConfig = {
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
        }
        else {
            this.onRender = false;
        }
        this.update = update;
    }
    heartCol;
    collision;
    director;
    /**0 is green, 1 is purple */
    color;
    spin;
    speed;
    speedAngle;
    tweenAnchor;
    oldAngle;
    oldPosition;
    platLength;
    oldLength;
    destroyed;
    onRender;
    Scaffold;
    Zone;
    MatterObject;
    get colorKey() {
        let v;
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
    set colorKey(v) {
        if (typeof v === "number") {
            this.color = 2 % Math.floor(v);
        }
        else {
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
    update;
}
//# sourceMappingURL=platform.js.map