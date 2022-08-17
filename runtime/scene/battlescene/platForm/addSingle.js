import Keys from "../../../keys.js";
import PlatForm from "./platform.js";
function addSingle(config) {
    let a = new PlatForm(this.scene, config, this.collision, this.heartCol);
    a.setDepth(Keys.Depth.platform);
    this.add(a);
}
export default addSingle;
//# sourceMappingURL=addSingle.js.map