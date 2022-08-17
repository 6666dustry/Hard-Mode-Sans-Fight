import Keys from "../../../keys.js";
import update from "./BoneUpdate.js";
import deleteTween from "./deleteTween.js";
import spawnTween from "./spawnTween.js";
import getAnchoredPos from "../getAnchoredPos.js";
import Bullet from "../bullet/bullet.js";
import setTween from "../setTween.js";
class Bone extends Bullet {
    constructor(scene, config, collision, DIRECTOR, moveType) {
        //set config #region 
        let speed, speedAngle, angle, spin, lifetime;
        speed = config.speed || 0;
        speedAngle = config.speedAngle || 0;
        angle = config.angle || 0;
        spin = config.spin || 0;
        lifetime = config.lifetime;
        let Anchor;
        if (config.anchor) {
            Anchor = {
                x: config.anchor.x || "bottom",
                y: config.anchor.y || "bottom"
            };
        }
        else {
            Anchor = {
                x: "bottom",
                y: "bottom"
            };
        }
        //#endregion
        super(scene, DIRECTOR, config.color);
        this.spin = spin;
        this.speed = speed;
        this.speedAngle = speedAngle;
        this.moveType = moveType || "normal";
        this.deleteTweenType = config.deleteTween;
        this.spawnTweenType = config.spawnTween;
        this.state = "appear";
        this.tweenAnchor = config.tweenAnchor || "middle";
        this.collision = collision;
        this.deleteTween = deleteTween;
        this.spawnTween = spawnTween;
        //middle.
        this.middle = scene.add.sprite(0, 0, Keys.Image.bone, 1);
        //top.
        this.top = scene.add.image(0, 0, Keys.Image.bone, 0);
        //bottom.
        this.bottom = scene.add.image(0, 0, Keys.Image.bone, 3);
        const PADDING = this.top.displayHeight + this.bottom.displayHeight;
        this.displayLength = config.length || PADDING;
        this.oldLength = this.displayLength;
        if (Math.abs(this.displayLength) <= Math.abs(PADDING)) {
            this.boneLength = 1;
            this.displayLength = PADDING;
        }
        else {
            this.boneLength = this.displayLength - PADDING;
        }
        this.middle.displayHeight = this.boneLength;
        this.top.setPosition(0, -(this.middle.displayHeight / 2) - this.top.displayHeight / 2);
        this.bottom.setPosition(0, (this.middle.displayHeight / 2) + this.bottom.displayHeight / 2);
        //add container.
        this.add([this.top, this.middle, this.bottom]);
        const WIDTH = this.middle.displayWidth;
        let AnchorConfig = {
            x: config.x || 0,
            y: config.y || 0,
            width: WIDTH,
            height: this.displayLength,
            anchor: Anchor,
            angle: angle
        };
        let newPos = getAnchoredPos(AnchorConfig, true);
        this.setPosition(newPos.x, newPos.y);
        this.spawnTween(this.spawnTweenType);
        scene.add.existing(this);
        this.setSize(WIDTH * 0.2, this.boneLength);
        //add matter body.
        this.MatterObject = scene.matter.add.gameObject(this);
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
        this.setAngle(angle);
        if (config.sound) {
            this.scene.sound.play(Keys.Audio[config.sound]);
        }
        this.tints = [this.top, this.middle, this.bottom];
        this.colorKey = config.color || "white";
        this.oldAngle = this.angle;
        this.oldColor = this.color;
        if (lifetime && lifetime !== Infinity) {
            //set lifetime
            this.scene.time.delayedCall(lifetime, this.deleteTween, [this.deleteTweenType], this);
        }
        if (!config.visible) {
            if (this.state !== "appear") {
                this.director.CombatzoneDirector.draws.push(this);
                this.onRender = true;
            }
            this.visible = false;
            this.onRender = false;
        }
        else {
            this.onRender = false;
        }
        this.destroyed = false;
        //add tween. can multiple
        if (config.tween) {
            setTween(scene, this, config.tween, {
                length: "displayLength"
            });
        }
    }
    moveType;
    collision;
    state;
    oldColor;
    top;
    middle;
    bottom;
    /**this is just hit box length. please change displayLength instead of boneLength*/
    boneLength;
    displayLength;
    /**used for check changed length. */
    oldLength;
    speed;
    speedAngle;
    tweenAnchor;
    spawnTweenType;
    deleteTweenType;
    spin;
    destroyed;
    onRender;
    oldAngle;
    MatterObject;
    deleteTween;
    spawnTween;
    update() {
        update.call(this);
        if (this.moveType === "menu") {
            this.checkTakeDamage(this.body, false, true);
        }
        else {
            super.update();
        }
    }
    destroy(fromScene) {
        if (this.scene && this.scene.sys && this.scene.sys.displayList) {
            this.scene.tweens.killTweensOf(this);
            super.destroy(false);
        }
        this.destroyed = true;
    }
}
export default Bone;
//# sourceMappingURL=bone.js.map