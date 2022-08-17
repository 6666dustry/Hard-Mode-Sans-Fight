/**
 * do valueA - valueB.
 * @param this
 * @param config
 */
function sub(config) {
    const A = config.valueA;
    const B = config.valueB;
    this.variables[config.variable] = A - B;
}
export default sub;
//# sourceMappingURL=sub.js.map