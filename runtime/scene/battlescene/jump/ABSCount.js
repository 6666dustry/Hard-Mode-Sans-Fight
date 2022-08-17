/**jump absolute with count*/
function ABSCount(config) {
    /**own position */
    const INDEX = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === undefined) {
        this.counter[INDEX] = typeof config.count === "number" ? config.count : 1;
    }
    let to;
    if (typeof config.to !== "number") {
        to = this.searchLabel(config.to);
    }
    else {
        to = config.to;
    }
    if (this.counter[INDEX] > 0) {
        this.director.AttackLoader.runAttackPos = to;
        this.counter[INDEX]--;
        if (config.remain) {
            this.director.GameMath.variables[config.remain] = this.counter[INDEX];
        }
        return true;
    }
    else {
        this.counter[INDEX] = undefined;
        return false;
    }
}
export default ABSCount;
//# sourceMappingURL=ABSCount.js.map