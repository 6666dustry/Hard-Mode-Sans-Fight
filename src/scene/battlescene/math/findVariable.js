export default function findVariable(key) {
    if (typeof key === "string" && key[0] === "$") {
        return this.variableToUse(key);
    }
    else {
        return key;
    }
}
//# sourceMappingURL=findVariable.js.map