import { MulConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function mul(this: GameMath, data: MulConfig) {

    const A: number = data.valueA;
    const B: number = data.valueB;
    this.variables[data.variable] = A * B;
}
export default mul;