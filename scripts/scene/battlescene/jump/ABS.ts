import { ABSConfig, AllReadonly } from "../../../Types.js";
import checkType from "../checkType.js";
import Jumps from "./Jumps.js";
/**jump absolute*/
export default function ABS(this: Jumps, config: AllReadonly<ABSConfig>): true {
    const DATA = checkType(config, {
        to: ["number", "string"]
    }, this.director.AttackLoader.runAttackPos);
    let to;

    if (typeof DATA.to !== "number") {
        to = this.searchLabel(DATA.to);
    } else {
        to = DATA.to;
    }

    this.director.AttackLoader.runAttackPos = to;
    return true;
}