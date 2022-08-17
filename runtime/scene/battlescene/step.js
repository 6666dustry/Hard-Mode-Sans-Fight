import makeDeepCopy from "./makeDeepCopy.js";
import stepType from "./steptype.js";
/**
 * @param stepped
 * @param stepper
 * @param makeCopy is make deep copy? default is false.
 * @returns
 */
export default function step(stepped, stepper, makeCopy) {
    let result = stepped;
    if (makeCopy) {
        result = makeDeepCopy(stepped);
    }
    const STEP_KEY = Object.keys(stepper);
    for (const iterator of STEP_KEY) {
        if (result[iterator] != null) {
            switch (typeof result[iterator]) {
                case "object":
                    result[iterator] = step(result[iterator], stepper[iterator]);
                    break;
                case "number":
                    result[iterator] = stepType(result[iterator], stepper[iterator]);
                    break;
                default:
                    console.warn(`${String(iterator)} is not number.`);
            }
        }
        else {
            console.warn(`${String(iterator)} is not defined.`);
        }
    }
    return result;
}
//# sourceMappingURL=step.js.map