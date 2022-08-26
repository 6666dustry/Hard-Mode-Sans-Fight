import checkType from "../checkType.js";
export default function betWeenAngle(config) {
    const DATA = checkType(config, {
        angle: "string",
        fromX: {
            type: "number",
            default: 0
        },
        fromY: {
            type: "number",
            default: 0
        },
        toX: {
            type: "number",
            default: 0
        },
        toY: {
            type: "number",
            default: 0
        },
        isRadian: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    let angle = -Phaser.Math.Angle.BetweenY(DATA.fromX, DATA.fromY, DATA.toX, DATA.toY);
    if (config.isRadian) {
        this.variables[config.angle] = angle;
    }
    else {
        this.variables[config.angle] = Phaser.Math.RadToDeg(angle);
    }
}
//# sourceMappingURL=betWeenAngle.js.map