import checkType from "../checkType.js";
export default function rndValues(config) {
    const DATA = checkType(config, {
        variable: "string",
        values: "object"
    }, this.director.AttackLoader.runAttackPos);
    let index = Phaser.Math.Between(0, DATA.values.length - 1);
    this.variables[DATA.variable] = DATA.values[index];
}
//# sourceMappingURL=rndValues.js.map