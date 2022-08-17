import { ABSCountConfig } from "../../../Types.js";
import Jumps from "./Jumps.js";
/**jump absolute with count*/
function ABSCount(this: Jumps, config: ABSCountConfig) {
    /**own position */
    const INDEX: number = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === undefined) {
        this.counter[INDEX] = typeof config.count === "number" ? config.count : 1;
    }
    let to: number;
    if (typeof config.to !== "number") {
        to = this.searchLabel(config.to);
    } else {
        to = config.to;
    }
    if (this.counter[INDEX] as number > 0) {
        this.director.AttackLoader.runAttackPos = to;
        (this.counter[INDEX] as number)--;
        if (config.remain) {
            this.director.GameMath.variables[config.remain] = this.counter[INDEX] as number;
        }

        return true;
    } else {
        this.counter[INDEX] = undefined;
        return false;
    }
}
export default ABSCount;