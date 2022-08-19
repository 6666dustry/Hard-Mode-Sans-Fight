import checkType from "../checkType.js";
/**jump absolute with count*/
export default function ABSCount(config) {
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
    const INDEX = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === undefined) {
        this.counter[INDEX] = DATA.count;
    }
    let to;
    if (typeof DATA.to !== "number") {
        to = this.searchLabel(DATA.to);
    }
    else {
        to = DATA.to;
    }
    if (this.counter[INDEX] > 0) {
        this.director.AttackLoader.runAttackPos = to;
        this.counter[INDEX]--;
        if (DATA.remain) {
            this.director.GameMath.variables[DATA.remain] = this.counter[INDEX];
        }
        return true;
    }
    else {
        this.counter[INDEX] = undefined;
        return false;
    }
}
//# sourceMappingURL=ABSCount.js.map