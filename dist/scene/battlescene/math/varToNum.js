/**
 *
 * @param this
 * @param key variable name must start with $.
 * @returns
 */
export default function variableToUse(key) {
    if (key[0] === "$") {
        let strings = key.slice(1);
        let result;
        result = this.variables[strings];
        if (result !== undefined) {
            return result;
        }
        console.error(`variable name is not defined ${key}`);
        return 0;
    }
    return key;
}
//# sourceMappingURL=varToNum.js.map