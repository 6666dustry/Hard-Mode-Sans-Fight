import { BoneConfig } from "../../../../Types.js";
import Keys from "../../../../keys.js";
import stabBone from "./stabBone.js";
import compareBigger from "./compareBigger.js";
export default function spawnStab(this: stabBone) {
    if (!this.scene) {
        return;
    }
    this.scene.sound.play(Keys.Audio.boneStab);
    this.warnBox.clear();
    this.warnBox.setActive(false);

    this.state = "stabbing";
    const ANIM_TIME = 65;
    let boneConfig: BoneConfig = {
        x: 0,
        y: 0,
        length: this.length,
        lifetime: this.lifetime,
        spawnTween: {
            tween: "biggerBottom",
            duration: ANIM_TIME
        },

        deleteTween: {
            tween: "smallerBottom",
            duration: ANIM_TIME
        },
        color: this.color
    };
    let addValue: Phaser.Math.Vector2 = new Phaser.Math.Vector2(11, 0);
    const INST_ANG: number = this.Zone.up.angle;
    const INST_ROT: number = this.Zone.up.rotation;

    const Rect = this.Zone.RectSize;
    switch (this.direction) {
        case "up":
            let startFrom: Phaser.Math.Vector2 = this.addTo.getBottomLeft();
            const MAX: Phaser.Math.Vector2 = this.addTo.getBottomRight();

            boneConfig.angle = INST_ANG;
            addValue.rotate(INST_ROT);
            startFrom.subtract(addValue);

            MAX.add(addValue);

            do {
                boneConfig.x = startFrom.x;
                boneConfig.y = startFrom.y;
                this.Bones.push(this.BONE_DIRECTOR.addSingle(boneConfig));
                startFrom.add(addValue);
            } while (compareBigger(startFrom, MAX, INST_ANG));
            break;

        case "right": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getBottomLeft();
            const MAX: Phaser.Math.Vector2 = this.addTo.getTopLeft();

            boneConfig.angle = INST_ANG + 90;
            addValue.rotate(Phaser.Math.DegToRad(INST_ANG - 90));

            startFrom.subtract(addValue);

            MAX.add(addValue);

            do {
                boneConfig.x = startFrom.x;
                boneConfig.y = startFrom.y;

                this.Bones.push(this.BONE_DIRECTOR.addSingle(boneConfig));

                startFrom.add(addValue);
            } while (compareBigger(startFrom, MAX, INST_ANG + 90));
            break;
        }
        case "down": {

            let startFrom: Phaser.Math.Vector2 = new Phaser.Math.Vector2(Rect.right, Rect.bottom);


            const MAX: Phaser.Math.Vector2 = new Phaser.Math.Vector2(Rect.left, Rect.bottom);

            boneConfig.angle = INST_ANG + 180;
            addValue.rotate(Phaser.Math.DegToRad(INST_ANG - 180));

            startFrom.subtract(addValue);

            MAX.add(addValue);
            do {
                boneConfig.x = startFrom.x;
                boneConfig.y = startFrom.y;

                this.Bones.push(this.BONE_DIRECTOR.addSingle(boneConfig));

                startFrom.add(addValue);
            } while (compareBigger(startFrom, MAX, INST_ANG + 180));
            break;
        }
        case "left": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getTopRight();
            const MAX: Phaser.Math.Vector2 = this.addTo.getBottomRight();

            boneConfig.angle = INST_ANG + 270;
            addValue.rotate(Phaser.Math.DegToRad(INST_ANG - 270));

            startFrom.subtract(addValue);

            MAX.add(addValue);

            do {
                boneConfig.x = startFrom.x;
                boneConfig.y = startFrom.y;

                this.Bones.push(this.BONE_DIRECTOR.addSingle(boneConfig));

                startFrom.add(addValue);
            } while (compareBigger(startFrom, MAX, INST_ANG + 270));
            break;
        }
    }

    this.scene.time.delayedCall(this.lifetime + ANIM_TIME, this.destroyStab, undefined, this);
}