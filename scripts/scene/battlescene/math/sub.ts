import type { AllReadonly, SubConfig } from "../../../Types.js";
import type GameMath from "./GameMath.js";
import checkType from "../checkType.js";
/**
 * do valueA - valueB.
 * @param this 
 * @param config 
 */
export default function sub(this: GameMath, config: AllReadonly<SubConfig>) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);

    const A: number = DATA.valueA;
    const B: number = DATA.valueB;
    this.variables[DATA.variable] = A - B;
}