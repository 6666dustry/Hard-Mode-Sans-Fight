import makeDeepCopy from "../../makeDeepCopy.js";
import update from "./update.js";
import Keys from "../../../../keys.js";
import getPadding from "./getPadding.js";
import { gameDebug } from "../../../../main.js";
import setTarget from "../../setTween.js";
class CircleBone extends Phaser.GameObjects.Zone {
    constructor(scene, Config, BoneDirector) {
        super(scene, Config.x, Config.y);
        scene.add.existing(this);
        this.BoneDirector = BoneDirector;
        this.spaceRadius = typeof Config.spaceRadius === "number" ? Config.spaceRadius : 30;
        this.boneRadius = typeof Config.boneRadius === "number" ? Config.boneRadius : 30;
        this.count = Config.count || 4;
        this.startAngle = Config.startAngle || 0;
        this.padding = Config.padding || "equal";
        this.rotateSpeed = typeof Config.rotateSpeed === "number" ? Config.rotateSpeed : 1;
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
        if (Config.boneConfig) {
            this.Config = makeDeepCopy(Config.boneConfig);
        }
        else {
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
        }
        else {
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
        }
        else {
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
                if (Config.stepAngle || Config.stepAngle == null) {
                    this.Config.angle += this.getPadding();
                }
            }
        }
        if (Config.tween) {
            setTarget(scene, this, Config.tween);
        }
        this.setPosition(Config.x, Config.y);
        this.oldX = this.x;
        this.oldY = this.y;
        this.update = update;
    }
    set centerX(v) {
        for (const iterator of this.Bones) {
            iterator.x += v - this.x;
        }
        this.x = v;
    }
    set centerY(v) {
        for (const iterator of this.Bones) {
            iterator.y += v - this.y;
        }
        this.y = v;
    }
    get centerX() {
        return this.x;
    }
    get centerY() {
        return this.y;
    }
    BoneDirector;
    boneRadius;
    spaceRadius;
    count;
    startAngle;
    padding;
    rotateSpeed;
    Config;
    Bones;
    middlePoint;
    angleLine;
    oldX;
    oldY;
    lockLength;
    getPadding;
    destroy() {
        if (this.middlePoint) {
            this.middlePoint.clear();
            this.middlePoint.destroy();
        }
        super.destroy();
    }
}
export default CircleBone;
//# sourceMappingURL=circleBone.js.map