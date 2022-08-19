export default function checkType(Check, Property, runAttackPosition, ignoreWarn) {
    const KEYS = Object.keys(Property);
    if (Check == undefined || typeof Check !== "object") {
        console.error(`data is not object at ${runAttackPosition} `);
    }
    for (const iterator of KEYS) {
        const element = Property[iterator];
        const checked = Check[iterator];
        if (typeof element === "object" && !Array.isArray(element)) {
            //here, element is object. not array.
            if (checked == undefined) {
                Check[iterator] = element.default;
                continue;
            }
            if (Array.isArray(element.type)) {
                let isMatched = false;
                for (const ITERATOR of element.type) {
                    if (typeof checked === ITERATOR) {
                        isMatched = true;
                        break;
                    }
                }
                if (!isMatched) {
                    console.error(`${String(iterator)} is not ${element.type.join(" or ")} at ${runAttackPosition}`);
                }
            }
            else {
                if (typeof checked !== element.type) {
                    console.error(`${String(iterator)} is not ${element.type} at ${runAttackPosition}`);
                    Check[iterator] = element.default;
                }
            }
        }
        else {
            //here, element is string or array.
            if (checked == undefined) {
                console.error(`${String(iterator)} is not defined at ${runAttackPosition}`);
            }
            if (Array.isArray(element)) {
                let isMatched = false;
                for (const ITERATOR of element) {
                    if (typeof checked === ITERATOR) {
                        isMatched = true;
                        break;
                    }
                }
                if (!isMatched) {
                    console.error(`${String(iterator)} is not ${element.join(" or ")} at ${runAttackPosition}`);
                }
            }
            else {
                if (typeof checked !== element) {
                    console.error(`${String(iterator)} is not ${element} at ${runAttackPosition}`);
                }
            }
        }
    }
    const CHECK_KEYS = Object.keys(Check);
    if (ignoreWarn) {
        CHECK_KEYS.forEach((value, index, array) => {
            for (const key in ignoreWarn) {
                if (Object.prototype.hasOwnProperty.call(ignoreWarn, key)) {
                    const element = ignoreWarn[key];
                    if (element) {
                        if (value === key) {
                            CHECK_KEYS.splice(index, 1);
                        }
                    }
                }
            }
        });
    }
    for (const iterator of CHECK_KEYS) {
        if (Property[iterator] == undefined) {
            console.warn(`${String(iterator)} is not defined at ${runAttackPosition}`);
        }
    }
    return Check;
}
//# sourceMappingURL=checkType.js.map