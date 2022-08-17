export default function checkType(Check, Property, runAttackPosition) {
    const KEYS = Object.keys(Property);
    if (Check == undefined || typeof Check !== "object") {
        console.error(`data is not object at ${runAttackPosition} `);
    }
    for (const iterator of KEYS) {
        const element = Property[iterator];
        if (typeof element === "object" && !Array.isArray(element)) {
            //here, element is object. not array.
            if (Check[iterator] == undefined) {
                Check[iterator] = element.default;
            }
            if (Array.isArray(element.type)) {
                let isMatched = false;
                for (const iterator of element.type) {
                    if (typeof Check[iterator] === iterator) {
                        isMatched = true;
                    }
                }
                if (!isMatched) {
                    console.error(`${String(iterator)} is not ${element.type.join(" or ")} at ${runAttackPosition}`);
                }
            }
            else {
                if (typeof Check[iterator] !== element.type) {
                    console.error(`${String(iterator)} is not ${element.type} at ${runAttackPosition}`);
                    Check[iterator] = element.default;
                }
            }
        }
        else {
            //here, element is string or array.
            if (Check[iterator] == undefined) {
                console.error(`${String(iterator)} is not defined at ${runAttackPosition}`);
            }
            if (Array.isArray(element)) {
                let isMatched = false;
                for (const iterator of element) {
                    if (typeof Check[iterator] === iterator) {
                        isMatched = true;
                    }
                }
                if (!isMatched) {
                    console.error(`${String(iterator)} is not ${element.join(" or ")} at ${runAttackPosition}`);
                }
            }
            else {
                if (typeof Check[iterator] !== element) {
                    console.error(`${String(iterator)} is not ${element} at ${runAttackPosition}`);
                }
            }
        }
    }
    const CHECK_KEYS = Object.keys(Check);
    for (const iterator of CHECK_KEYS) {
        if (Property[iterator] == undefined) {
            console.warn(`${String(iterator)} is not defined at ${runAttackPosition}`);
        }
    }
    return Check;
}
//# sourceMappingURL=checkType.js.map