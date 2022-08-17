function findVariable(key) {
    if (typeof key === "string" && key[0] === "$") {
        return this.variableToUse(key);
    }
    else {
        return key;
    }
}
export default findVariable;
//# sourceMappingURL=findVariable.js.map