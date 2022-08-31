import type BoneDirector from "./BoneDirector";
import type Bone from "./Bone.js";
export default function update(this: BoneDirector, time: number): void {
    const SIZE: Phaser.Scale.ScaleManager = this.scene.scale;
    //update bones.
    for (const iterator of this.getChildren() as Bone[]) {

        if (iterator.x < 0 - SIZE.width ||
            iterator.x > SIZE.width * 2 ||
            iterator.y < 0 - SIZE.height ||
            iterator.y > SIZE.height * 2) {
            iterator.destroy();
            continue;
        }

        iterator.update();
        if (!iterator.visible && !iterator.onRender && iterator.moveType !== "menu") {
            this.director.CombatzoneDirector.draws.push(iterator);
            iterator.onRender = true;
        }
    }
    for (const iterator of this.stabs) {
        iterator.update();
    }
    for (const iterator of this.circles) {
        if (iterator.x < 0 - SIZE.width ||
            iterator.x > SIZE.width * 2 ||
            iterator.y < 0 - SIZE.height ||
            iterator.y > SIZE.height * 2) {
            iterator.destroy();
            continue;
        }
        iterator.update();
    }
}