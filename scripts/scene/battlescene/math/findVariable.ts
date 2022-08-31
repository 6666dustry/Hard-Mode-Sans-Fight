import type GameMath from "./GameMath.js";
import type { variableName, variableType } from "../../../Types.js";
export default function findVariable<Type>(this: GameMath, key?: variableName | Type,): variableType | Type | undefined {
    if (typeof key === "string" && key[0] === "$") {
        return this.variableToUse(key as variableName);

    } else {
        return key as Type;
    }
}
