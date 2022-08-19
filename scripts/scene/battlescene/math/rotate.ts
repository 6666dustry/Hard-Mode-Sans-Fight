import { AllReadonly, RotateConfig } from "../../../Types.js";
import checkType from "../checkType.js";
import GameMath from "./GameMath.js";

export default function rotate(this: GameMath, config: AllReadonly<RotateConfig>) {
    const DATA = checkType(config, {
        pointX: {
            type: "number",
            default: 0
        },
        pointY: {
            type: "number",
            default: 0
        },
        originX: {
            type: "number",
            default: 0
        },
        originY: {
            type: "number",
            default: 0
        },
        x: {
            type: "string",
            default: undefined
        },
        y: {
            type: "string",
            default: undefined
        },
        angle: "number"
    }, this.director.AttackLoader.runAttackPos);

    let point = new Phaser.Math.Vector2(DATA.pointX, DATA.pointY);
    let angle = Phaser.Math.DegToRad(DATA.angle);

    angle = Phaser.Math.Angle.Wrap(angle);

    if (DATA.originX || DATA.originY) {
        Phaser.Math.RotateAround(point, DATA.originX, DATA.originY, angle);
    } else {
        Phaser.Math.Rotate(point, angle);
    }

    if (DATA.x) {
        this.variables[DATA.x] = point.x;
    }
    if (DATA.y) {
        this.variables[DATA.y] = point.y;
    }
}