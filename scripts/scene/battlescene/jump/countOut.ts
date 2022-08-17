import { CountOutConfig } from "../../../Types.js";
import Jumps from "./Jumps.js";
/**if through count time, then jump*/
function countOut(this: Jumps, config: CountOutConfig) {
    const INDEX: number = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === false) {
        return false;
    } else {
        if (this.counter[INDEX] === undefined) {
            this.counter[INDEX] = typeof config.count === "number" ? config.count : 1;
        }

        if (this.counter[INDEX] as number > 0) {

            (this.counter[INDEX] as number)--;
            return false;
        } else {
            let to: number;
            if (typeof config.to !== "number") {
                to = this.searchLabel(config.to);
            } else {
                to = config.to;
            }
            if (config.rel) {
                this.director.AttackLoader.runAttackPos += to;
            } else {
                this.director.AttackLoader.runAttackPos = to;
            }
            if (config.once) {
                this.counter[INDEX] = false;
            } else {
                this.counter[INDEX] = undefined;
            }
            return true;
        }
    }
}
export default countOut;