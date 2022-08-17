import stabBone from "./stabBone.js";
function destroyStab(this: stabBone) {
    for (const iterator of this.Bones) {
        iterator.removeAll(true);
        iterator.destroy();
    }
    if (this.warnBox) {
        this.warnBox.destroy();
    }
    this.destroy();
}
export default destroyStab;