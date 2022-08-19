import type { AllReadonly, ModConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";
import checkType from "../checkType.js";

export default function mod(this: GameMath, config: AllReadonly<ModConfig>) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);

    const A: number = DATA.valueA;
    const B: number = DATA.valueB;
    this.variables[DATA.variable] = A % B;
}