import Keys from "../../../keys.js";
import { PlatFormSingleConfig } from "../../../Types.js";
import PlatForm from "./platform.js";
import PlatFormDirector from "./platformDirector.js";

export default function addSingle(this: PlatFormDirector, config: PlatFormSingleConfig, type?: string, ignoreWarn?: {
    [k: string]: boolean;
}) {
    let a = new PlatForm(this.scene, config, this.collision, this.heartCol, type, ignoreWarn);

    a.setDepth(Keys.Depth.platform);
    this.add(a);
}