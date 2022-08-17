import { SetConfig } from "../../../Types.js";
import GameMath from "./GameMath.js";

function set(this: GameMath, data: SetConfig) {
    this.variables[data.variable] =
        data.value;
}
export default set;