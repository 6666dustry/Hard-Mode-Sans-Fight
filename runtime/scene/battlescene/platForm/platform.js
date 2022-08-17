import Keys from "../../../keys.js";
import BoxNinePatch from "./boxNinePatch.js";
import update from "./platformUpdate.js";
import getAnchoredPos from "../getAnchoredPos.js";
import setTarget from "../setTween.js";
class PlatForm extends Phaser.GameObjects.Container {
    constructor(scene, config = {
        x: 0,
        y: 0,
        angle: 0,
        lifetime: false,
        anchor: {
            x: "bottom",
            y: "bottom"
        },
        spin: 0,
        length: 30,
        speed: 0,
        speedAngle: 0,
        tween: false,
        tweenAnchor: "middle",
        color: "green"
    }, collision, heartCol) {
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
            }
            else {
                switch (config.color) {
                    case "green":
                        this.color = 0;
                        break;
                    case "purple":
                        this.color = 1;
                        break;
                }
            }
        }
        else {
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
export default PlatForm;
//# sourceMappingURL=platform.js.map