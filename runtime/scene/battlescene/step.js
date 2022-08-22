import makeDeepCopy from "./makeDeepCopy.js";
import stepType from "./steptype.js";
/**
 * does not support array.
 * @param stepped
 * @param stepper
 * @param makeCopy is make deep copy? default is false.
 * @returns stepped values.
 */
export default function step(stepped, stepper, makeCopy) {
    let result = stepped;
    if (makeCopy) {
        result = makeDeepCopy(stepped);
    }
    const STEP_KEY = Object.keys(stepper);
    for (const iterator of STEP_KEY) {
        let element = result[iterator];
        let config = stepper[iterator];
        if (element != null) {
            switch (typeof element) {
                case "object":
                    result[iterator] = step(element, config);
                    break;
                case "number":
                    result[iterator] = stepType(element, config);
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