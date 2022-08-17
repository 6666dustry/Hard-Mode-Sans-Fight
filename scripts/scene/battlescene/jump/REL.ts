import { RELConfig } from "../../../Types.js";
import Jumps from "./Jumps.js";
/**jump relative*/
function REL(this: Jumps, config: RELConfig): true {

    let to: number;
    if (typeof config.to !== "number") {
        to = this.searchLabel(config.to);
    } else {
        to = config.to;
    }
    this.director.AttackLoader.runAttackPos += to;
    return true;
}
export default REL;