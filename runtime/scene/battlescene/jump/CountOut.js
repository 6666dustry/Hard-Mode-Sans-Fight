/**if through count time, then jump*/
function countOut(config) {
    const INDEX = this.director.AttackLoader.runAttackPos;
    if (this.counter[INDEX] === false) {
        return false;
    }
    else {
        if (this.counter[INDEX] === undefined) {
            this.counter[INDEX] = typeof config.count === "number" ? config.count : 1;
        }
        if (this.counter[INDEX] > 0) {
            this.counter[INDEX]--;
            return false;
        }
        else {
            let to;
            if (typeof config.to !== "number") {
                to = this.searchLabel(config.to);
            }
            else {
                to = config.to;
            }
            if (config.rel) {
                this.director.AttackLoader.runAttackPos += to;
            }
            else {
                this.director.AttackLoader.runAttackPos = to;
            }
            if (config.once) {
                this.counter[INDEX] = false;
            }
            else {
                this.counter[INDEX] = undefined;
            }
            return true;
        }
    }
}
export default countOut;
//# sourceMappingURL=CountOut.js.map