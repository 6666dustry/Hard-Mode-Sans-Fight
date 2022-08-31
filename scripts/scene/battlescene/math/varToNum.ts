import type { variableName, variableType } from "../../../Types.js";
import type GameMath from "./GameMath.js";
/**
 * 
 * @param this 
 * @param key variable name must start with $.
 * @returns 
 */
export default function variableToUse(this: GameMath, key: variableName): variableType {
    if (key[0] === "$") {
        let strings = key.slice(1);

        let result: variableType;

        result = this.variables[strings];

        if (result !== undefined) {
            return result;
        }

        console.warn(`variable name is not defined ${ key }`);
        return 0;
    }
    return key;
}