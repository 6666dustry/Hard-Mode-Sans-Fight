import checkType from "../checkType.js";
/**
 * do valueA - valueB.
 * @param this
 * @param config
 */
export default function sub(config) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);
    const A = DATA.valueA;
    const B = DATA.valueB;
    this.variables[DATA.variable] = A - B;
}
//# sourceMappingURL=sub.js.map