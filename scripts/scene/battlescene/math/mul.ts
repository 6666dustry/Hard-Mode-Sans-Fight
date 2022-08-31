import type { AllReadonly, MulConfig } from "../../../Types.js";
import type GameMath from "./GameMath.js";
import checkType from "../checkType.js";
export default function mul(this: GameMath, config: AllReadonly<MulConfig>) {

    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);

    const A: number = DATA.valueA;
    const B: number = DATA.valueB;
    this.variables[DATA.variable] = A * B;
}