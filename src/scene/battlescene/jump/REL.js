import checkType from "../checkType.js";
/**jump relative*/
export default function REL(config) {
    const DATA = checkType(config, {
        to: ["number", "string"]
    }, this.director.AttackLoader.runAttackPos);
    let to;
    if (typeof DATA.to !== "number") {
        to = this.searchLabel(DATA.to);
    }
    else {
        to = DATA.to;
    }
    this.director.AttackLoader.runAttackPos += to;
    return true;
}
//# sourceMappingURL=REL.js.map