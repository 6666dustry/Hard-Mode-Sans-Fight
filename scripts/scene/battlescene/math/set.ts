import { AllReadonly, SetConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

export default function set(this: GameMath, data: AllReadonly<SetConfig>) {
    this.variables[data.variable] = data.value;
}