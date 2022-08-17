import type { ModConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function mod(this: GameMath, data: ModConfig) {

    const A: number = data.valueA;
    const B: number = data.valueB;
    this.variables[data.variable] = A % B;
}
export default mod;