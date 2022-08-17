import GameMath from "./GameMath.js";
import { variableName, variableType } from "../../../Types.js";
function findVariable<Type>(this: GameMath, key?: variableName | Type,): variableType | Type | undefined {
    if (typeof key === "string" && key[0] === "$") {
        return this.variableToUse(key as variableName);

    } else {
        return key as Type;
    }
}
export default findVariable;
