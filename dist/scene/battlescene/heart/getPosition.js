import checkType from "../checkType.js";
export default function getPosition(config) {
    const DATA = checkType(config, {
        x: {
            type: "string",
            default: false
        },
        y: {
            type: "string",
            default: false
        },
    }, this.director.AttackLoader.runAttackPos);
    if (DATA.x) {
        this.director.GameMath.variables[DATA.x] = this.Image.x;
    }
    if (DATA.y) {
        this.director.GameMath.variables[DATA.y] = this.Image.y;
    }
}
//# sourceMappingURL=getPosition.js.map