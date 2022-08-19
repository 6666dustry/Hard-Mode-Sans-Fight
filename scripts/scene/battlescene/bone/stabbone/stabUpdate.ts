import stabBone from "./stabBone.js";
export default function update(this: stabBone, time: number) {
    if (this.Zone.moving && this.state === "warning") {
        this.warnBox.clear();
        this.setWarn();
    }
}