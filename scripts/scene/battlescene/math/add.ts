import type { AddConfig, AllReadonly } from "../../../Types.js";
import type GameMath from "./GameMath.js";
import checkType from "../checkType.js";

export default function add(this: GameMath, config: AllReadonly<AddConfig>) {
    const DATA = checkType(config, {
        variable: "string",
        valueA: "number",
        valueB: "number"
    }, this.director.AttackLoader.runAttackPos);

    const A: number = DATA.valueA;
    const B: number = DATA.valueB;
    this.variables[DATA.variable] = A + B;
}