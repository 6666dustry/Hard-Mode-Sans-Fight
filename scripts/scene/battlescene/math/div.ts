import { DivConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function div(this: GameMath, data: DivConfig) {

    const A: number = data.valueA;
    const B: number = data.valueB;
    this.variables[data.variable] = A / B;
}
export default div;