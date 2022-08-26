function searcher(search, addTo) {
    for (const O_KEY in search) {
        if (Object.prototype.hasOwnProperty.call(search, O_KEY)) {
            const ELEMENT = search[O_KEY];
            if (typeof ELEMENT === "string" && ELEMENT[0] === "$") {
                addTo[O_KEY] = this.GameMath.findVariable(ELEMENT);
                if (addTo[O_KEY] === undefined) {
                    console.warn(`can't find variable on ${O_KEY}`);
                }
            }
            else if (typeof ELEMENT === "object") {
                if (Array.isArray(ELEMENT)) {
                    addTo[O_KEY] = [];
                    searcher.call(this, ELEMENT, addTo[O_KEY]);
                }
                else {
                    addTo[O_KEY] = {};
                    searcher.call(this, ELEMENT, addTo[O_KEY]);
                }
            }
            else {
                addTo[O_KEY] = ELEMENT;
            }
        }
    }
}
export default function searchVariable(attack) {
    let result;
    result = {};
    //get objects
    for (const key in attack) {
        if (Object.prototype.hasOwnProperty.call(attack, key)) {
            const element = attack[key];
            if (typeof element === "object") {
                result[key] = {};
                searcher.call(this, element, result[key]);
            }
            else if (typeof element === "string" && element[0] === "$") {
                result[key] = this.GameMath.findVariable(element);
            }
            else {
                result[key] = element;
            }
        }
    }
    return result;
}
//# sourceMappingURL=searchVariable.js.map