import type { AllReadonly, CountOutConfig } from "../../../Types.js";
import type Jumps from "./Jumps.js";
import checkType from "../checkType.js";
/**if through count time, then jump*/
export default function countOut(this: Jumps, config: AllReadonly<CountOutConfig>) {
    const DATA = checkType(config, {
        to: ["number", "string"],
        rel: {
            type: "boolean",
            default: false
        },
        count: {
            type: "number",
            default: 1
        },
        once: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    const INDEX: number = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === false) {
        return false;

    } else {
        if (this.counter[INDEX] === undefined) {
            this.counter[INDEX] = DATA.count;
        }

        if (this.counter[INDEX] as number > 0) {

            (this.counter[INDEX] as number)--;
            return false;
        } else {
            let to: number;
            if (typeof DATA.to !== "number") {
                to = this.searchLabel(DATA.to);
            } else {
                to = DATA.to;
            }
            if (DATA.rel) {
                this.director.AttackLoader.runAttackPos += to;
            } else {
                this.director.AttackLoader.runAttackPos = to;
            }
            if (DATA.once) {
                this.counter[INDEX] = false;
            } else {
                this.counter[INDEX] = undefined;
            }
            return true;
        }
    }
}