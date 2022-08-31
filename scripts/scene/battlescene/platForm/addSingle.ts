import Keys from "../../../keys.js";
import type { PlatFormSingleConfig } from "../../../Types.js";
import PlatForm from "./platform.js";
import type PlatFormDirector from "./platformDirector.js";

export default function addSingle(this: PlatFormDirector, config: PlatFormSingleConfig, type?: string, ignoreWarn?: {
    [k: string]: boolean;
}) {
    let Platform = new PlatForm(this.scene, config, this.collision, this.heartCol, type, ignoreWarn);

    Platform.setDepth(Keys.Depth.platform);
    this.add(Platform);
}