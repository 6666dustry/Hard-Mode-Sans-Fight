import { RndValuesConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function rndValues(this: GameMath, config: RndValuesConfig) {
    let index = Phaser.Math.Between(0, config.values.length - 1);
    this.variables[config.variable] = config.values[index];
}
export default rndValues;