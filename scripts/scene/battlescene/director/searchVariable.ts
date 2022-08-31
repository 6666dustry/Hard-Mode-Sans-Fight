import type { SingleAttack } from "../../../Types.js";
import type Director from "./Director.js";
function searcher(this: Director,
    search:
        {
            [k: string]: any;
        },
    addTo: {
        [k: string]: any;
    }) {
    for (const O_KEY in search) {

        if (Object.prototype.hasOwnProperty.call(search, O_KEY)) {
            const ELEMENT = search[O_KEY];

            if (typeof ELEMENT === "string" && ELEMENT[0] === "$") {

                addTo[O_KEY] = this.GameMath.findVariable(ELEMENT);
                if (addTo[O_KEY] === undefined) {
                    console.warn(`can't find variable on ${ O_KEY }`);
                }

            } else if (typeof ELEMENT === "object") {

                if (Array.isArray(ELEMENT)) {
                    addTo[O_KEY] = [];
                    searcher.call(this, ELEMENT, addTo[O_KEY]);

                } else {
                    addTo[O_KEY] = {};
                    searcher.call(this, ELEMENT, addTo[O_KEY]);
                }

            } else {
                addTo[O_KEY] = ELEMENT;
            }
        }
    }
}
export default function searchVariable(this: Director, attack: Readonly<SingleAttack>): SingleAttack {
    let result: SingleAttack;
    result = {} as SingleAttack;

    //get objects
    for (const key in attack) {
        if (Object.prototype.hasOwnProperty.call(attack, key)) {
            const element = attack[key as keyof SingleAttack];

            if (typeof element === "object") {

                (result[key as keyof SingleAttack] as any) = {};
                searcher.call(this, element, result[key as keyof SingleAttack] as any);

            } else if (typeof element === "string" && element[0] === "$") {
                (result[key as keyof SingleAttack] as any) = this.GameMath.findVariable(element);
            } else {
                (result[key as keyof SingleAttack] as any) = element;
            }
        }
    }
    return result;
}