import checkType from "../checkType.js";
/**if through count time, then jump*/
export default function countOut(config) {
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
    const INDEX = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === false) {
        return false;
    }
    else {
        if (this.counter[INDEX] === undefined) {
            this.counter[INDEX] = DATA.count;
        }
        if (this.counter[INDEX] > 0) {
            this.counter[INDEX]--;
            return false;
        }
        else {
            let to;
            if (typeof DATA.to !== "number") {
                to = this.searchLabel(DATA.to);
            }
            else {
                to = DATA.to;
            }
            if (DATA.rel) {
                this.director.AttackLoader.runAttackPos += to;
            }
            else {
                this.director.AttackLoader.runAttackPos = to;
            }
            if (DATA.once) {
                this.counter[INDEX] = false;
            }
            else {
                this.counter[INDEX] = undefined;
            }
            return true;
        }
    }
}
//# sourceMappingURL=CountOut.js.map