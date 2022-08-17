import { SubConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";
/**
 * do valueA - valueB.
 * @param this 
 * @param config 
 */
function sub(this: GameMath, config: SubConfig) {

    const A: number = config.valueA;
    const B: number = config.valueB;
    this.variables[config.variable] = A - B;
}
export default sub;