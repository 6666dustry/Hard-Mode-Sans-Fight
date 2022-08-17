import { AddConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function add(this: GameMath, data: AddConfig) {

    const A: number = data.valueA;
    const B: number = data.valueB;
    this.variables[data.variable] = A + B;
}
export default add;