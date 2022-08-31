import type { AllReadonly, RELConfig } from "../../../Types.js";
import type Jumps from "./Jumps.js";
import checkType from "../checkType.js";
/**jump relative*/
export default function REL(this: Jumps, config: AllReadonly<RELConfig>): true {
    const DATA = checkType(config, {
        to: ["number", "string"]
    }, this.director.AttackLoader.runAttackPos);
    let to: number;
    if (typeof DATA.to !== "number") {
        to = this.searchLabel(DATA.to);
    } else {
        to = DATA.to;
    }
    this.director.AttackLoader.runAttackPos += to;
    return true;
}