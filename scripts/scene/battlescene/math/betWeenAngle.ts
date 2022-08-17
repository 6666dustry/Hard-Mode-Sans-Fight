import { BetWeenAngle, AllReadonly } from "../../../Types.js";
import checkType from "../checkType.js";
import GameMath from "./GameMath.js";

export default function betWeenAngle(this: GameMath, config: AllReadonly<BetWeenAngle>) {
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


    let angle = -Phaser.Math.Angle.BetweenY(
        DATA.fromX,
        DATA.fromY,
        DATA.toX,
        DATA.toY
    );

    if (config.isRadian) {
        this.variables[config.angle] = angle;
    } else {
        this.variables[config.angle] = Phaser.Math.RadToDeg(angle);
    }
}