import checkType from "../checkType.js";
export default function add(config) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);
    const A = DATA.valueA;
    const B = DATA.valueB;
    this.variables[DATA.variable] = A + B;
}
//# sourceMappingURL=add.js.map