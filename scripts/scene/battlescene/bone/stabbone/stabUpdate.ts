import stabBone from "./stabBone.js";
function update(this: stabBone, time: number) {
    if (this.Zone.moving && this.state === "warning") {
        this.warnBox.clear();
        this.setWarn();
    }
}
export default update;