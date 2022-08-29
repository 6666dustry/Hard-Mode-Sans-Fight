import { stepTypes } from "../../Types.js";
import makeDeepCopy from "./makeDeepCopy.js";
import stepType from "./stepType.js";
type stepFrom = {
    [k: string]: stepTypes | stepFrom;
};
/**
 * does not support array.
 * @param stepped 
 * @param stepper 
 * @param makeCopy is make deep copy? default is false.
 * @returns stepped values.
 */
export default function step<Type extends stepperType & {
    [k: string]: any;
}, stepperType extends {
    [k in keyof Type]: stepFrom
}
    ,>(stepped: Type, stepper: Readonly<stepperType>, makeCopy?: boolean): Type {

    let result: Type = stepped;
    if (makeCopy) {
        result = makeDeepCopy(stepped) as Type;
    }
    const STEP_KEY: (keyof typeof stepper)[] = Object.keys(stepper);

    for (const iterator of STEP_KEY) {
        let element = result[iterator];
        let config = stepper[iterator];

        if (element != null) {
            switch (typeof element) {
                case "object":

                    result[iterator] = step(element, config as any);
                    break;

                case "number":

                    (result[iterator] as number) = stepType(element, config as any);
                    break;
                default:
                    console.warn(`${ String(iterator) }(${ typeof stepped[iterator] }) is not number.`);
            }
        } else {
            console.warn(`${ String(iterator) } is not defined.`);
        }
    }
    return result;
}