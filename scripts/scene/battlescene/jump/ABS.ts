import { ABSConfig } from "../../../Types.js";
import Jumps from "./Jumps.js";
/**jump absolute*/
function ABS(this: Jumps, config: ABSConfig): true {
    let to;
    if (typeof config.to !== "number") {
        to = this.searchLabel(config.to);
    } else {
        to = config.to;
    }
    this.director.AttackLoader.runAttackPos = to;
    return true;
}
export default ABS;