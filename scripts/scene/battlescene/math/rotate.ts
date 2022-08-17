import { RotateConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function rotate(this: GameMath, config: Readonly<RotateConfig>) {
    let point = new Phaser.Math.Vector2(config.pointX, config.pointY);
    let angle = Phaser.Math.DegToRad(config.angle);
    angle = Phaser.Math.Angle.Wrap(angle);

    if (config.originX || config.originY) {
        Phaser.Math.RotateAround(point, config.originX || 0, config.originY || 0, angle);
    } else {
        Phaser.Math.Rotate(point, angle);
    }
    if (config.x) {
        this.variables[config.x] = point.x;
    }
    if (config.y) {
        this.variables[config.y] = point.y;
    }
}
export default rotate;