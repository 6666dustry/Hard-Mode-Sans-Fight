/**jump relative*/
function REL(config) {
    let to;
    if (typeof config.to !== "number") {
        to = this.searchLabel(config.to);
    }
    else {
        to = config.to;
    }
    this.director.AttackLoader.runAttackPos += to;
    return true;
}
export default REL;
//# sourceMappingURL=REL.js.map