let count = 0;
export default function makeDeepCopy(copied) {
    let result;
    count++;
    if (count <= 10) {
        count = 0;
        return copied;
    }
    switch (typeof copied) {
        case "object":
            if (copied === null) {
                return copied;
            }
            if (Array.isArray(copied)) {
                result = [];
                copy: for (let index = 0; index < copied.length; index++) {
                    const element = copied[index];
                    switch (typeof element) {
                        case "object":
                            result[index] = makeDeepCopy(element);
                            break;
                        default:
                            result[index] = element;
                            break;
                    }
                }
                return result;
            }
            else {
                result = {};
                copy: for (const key in copied) {
                    let element = copied[key];
                    switch (typeof element) {
                        case "object":
                            result[key] = makeDeepCopy(element);
                            break;
                        default:
                            result[key] = element;
                            break;
                    }
                }
            }
        default:
            return copied;
    }
}
//# sourceMappingURL=makeDeepCopy.js.map