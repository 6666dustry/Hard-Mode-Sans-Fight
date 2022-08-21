import { stepTypes } from "../../Types.js";
import makeDeepCopy from "./makeDeepCopy.js";
import stepType from "./steptype.js";
type stepFrom = {
    [k: string]: number | stepTypes | stepFrom;
};
/**
 * @param stepped 
 * @param stepper 
 * @param makeCopy is make deep copy? default is false.
 * @returns stepped values.
 */
export default function step<Type extends stepperType & {
    [k: string]: any;
}, stepperType extends stepFrom
    ,>(stepped: Type, stepper: Readonly<stepperType>, makeCopy?: boolean): Type {

    let result: Type = stepped;
    if (makeCopy) {
        result = makeDeepCopy(stepped) as Type;
    }
    const STEP_KEY: (keyof typeof stepper)[] = Object.keys(stepper);
    for (const iterator of STEP_KEY) {
        if (result[iterator] != null) {
            switch (typeof result[iterator]) {
                case "object":

                    result[iterator] = step(result[iterator], stepper[iterator] as stepFrom);
                    break;

                case "number":

                    (result[iterator] as number) = stepType(result[iterator], stepper[iterator] as Exclude<typeof stepper, stepFrom>);
                    break;
                default:
                    console.warn(`${ String(iterator) } is not number.`);
            }
        } else {
            console.warn(`${ String(iterator) } is not defined.`);
        }
    }
    return result;
}