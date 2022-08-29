import Bone from "../Bone.js";
import CircleBone from "./circleBone.js";

export default function update(this: CircleBone) {
    if (!this.scene) {
        return;
    }

    if (this.Bones.length <= 0) {
        this.destroy();
        return;
    }

    this.startAngle += this.rotateSpeed;

    //rotation.
    if (this.oldAngle !== this.angle) {
        let BonePos = new Phaser.Math.Vector2(0, (this.boneRadius / 2 + this.spaceRadius));

        BonePos.rotate(Phaser.Math.DegToRad(this.startAngle));
        let addAngle = this.startAngle - this.oldAngle;
        const PADDING = this.getPadding();

        for (const iterator of this.Bones as Bone[]) {

            if (!iterator.destroyed) {

                iterator.setPosition(BonePos.x + this.x, BonePos.y + this.y);

                iterator.angle += addAngle;

                if (!this.lockLength) {
                    iterator.displayLength = this.boneRadius;
                }

            }

            BonePos.rotate(Phaser.Math.DegToRad(PADDING));
        }
    }

    if (this.scene.director.Debug.state === "running" && this.middlePoint) {
        this.middlePoint.clear();
        this.middlePoint.x = this.x;
        this.middlePoint.y = this.y;
        this.middlePoint.fillCircle(0, 0, 5);
    }

    if (this.oldX !== this.x) {
        for (const iterator of this.Bones) {
            iterator.x += this.x - this.oldX;
        }
    }

    if (this.oldY !== this.y) {
        for (const iterator of this.Bones) {
            iterator.y += this.y - this.oldY;
        }
    }

    this.oldX = this.x;
    this.oldY = this.y;
    this.oldAngle = this.startAngle;
}