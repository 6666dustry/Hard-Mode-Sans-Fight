import stabBone from "./stabBone.js";
export default function destroyStab(this: stabBone) {
    for (const iterator of this.Bones) {
        iterator.removeAll(true);
        iterator.destroy();
    }
    if (this.warnBox) {
        this.warnBox.destroy();
    }
    this.destroy();
}