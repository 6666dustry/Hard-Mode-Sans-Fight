import { ABSCountConfig, AllReadonly } from "../../../Types.js";
import checkType from "../checkType.js";
import Jumps from "./Jumps.js";
/**jump absolute with count*/
export default function ABSCount(this: Jumps, config: AllReadonly<ABSCountConfig>) {
    const DATA = checkType(config, {
        to: ["number", "string"],
        count: {
            type: "number",
            default: 1
        },
        remain: {
            type: "string",
            default: undefined
        }
    }, this.director.AttackLoader.runAttackPos);
    /**own position */
    const INDEX: number = this.director.AttackLoader.runAttackPos;

    if (this.counter[INDEX] === undefined) {
        this.counter[INDEX] = DATA.count;
    }

    let to: number;
    if (typeof DATA.to !== "number") {
        to = this.searchLabel(DATA.to);
    } else {
        to = DATA.to;
    }

    if (this.counter[INDEX] as number > 0) {
        this.director.AttackLoader.runAttackPos = to;
        (this.counter[INDEX] as number)--;
        if (DATA.remain) {
            this.director.GameMath.variables[DATA.remain] = this.counter[INDEX] as number;
        }

        return true;
    } else {
        this.counter[INDEX] = undefined;
        return false;
    }
}