import checkType from "../checkType.js";
export default function rnd(config) {
    const DATA = checkType(config, {
        variable: "string",
        min: {
            type: "number",
            default: 0
        },
        max: "number",
        padding: {
            type: "number",
            default: 0
        },
        integer: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    const P = DATA.padding;
    const MIN = DATA.min;
    if (DATA.max - MIN <= P * 2) {
        console.error(`padding is too bigger at ${this.scene.director.AttackLoader.runAttackPos}`);
    }
    if (DATA.integer) {
        this.variables[DATA.variable] = Phaser.Math.Between(MIN + P, DATA.max - P);
    }
    else {
        this.variables[DATA.variable] = Phaser.Math.FloatBetween(MIN + P, DATA.max - P);
    }
}
//# sourceMappingURL=rnd.js.map