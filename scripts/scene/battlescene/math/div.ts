import type { AllReadonly, DivConfig } from "../../../Types.js";
import type GameMath from "./GameMath.js";
import checkType from "../checkType.js";

export default function div(this: GameMath, config: AllReadonly<DivConfig>) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);
    const A: number = DATA.valueA;
    const B: number = DATA.valueB;
    this.variables[DATA.variable] = A / B;
}