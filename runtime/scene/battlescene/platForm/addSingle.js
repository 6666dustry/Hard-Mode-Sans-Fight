import Keys from "../../../keys.js";
import PlatForm from "./platform.js";
export default function addSingle(config, type, ignoreWarn) {
    let a = new PlatForm(this.scene, config, this.collision, this.heartCol, type, ignoreWarn);
    a.setDepth(Keys.Depth.platform);
    this.add(a);
}
//# sourceMappingURL=addSingle.js.map