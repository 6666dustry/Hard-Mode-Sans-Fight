import checkType from "../checkType.js";
function mul(config) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);
    const A = DATA.valueA;
    const B = DATA.valueB;
    this.variables[DATA.variable] = A * B;
}
export default mul;
//# sourceMappingURL=mul.js.map