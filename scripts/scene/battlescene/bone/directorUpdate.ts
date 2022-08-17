import BoneDirector from "./BoneDirector";
import Bone from "./bone.js";
function update(this: BoneDirector, time: number): void {
    //update bones.
    for (const iterator of this.getChildren() as Bone[]) {
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
        iterator.update();
    }
}
export default update;