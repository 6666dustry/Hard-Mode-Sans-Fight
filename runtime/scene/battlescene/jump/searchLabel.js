function searchLabel(data) {
    try {
        let label;
        if (data[0] !== "#") {
            throw new Error(`label name is must be start a # at ${this.director.AttackLoader.runAttackPos}`);
        }
        else {
            label = data.slice(1);
        }
        for (let index = 0; index < this.director.AttackLoader.loadingAttack.length; index++) {
            const element = this.director.AttackLoader.loadingAttack[index];
            if (element.category === "jump" &&
                element.type === "label") {
                if (label === element.data.name) {
                    return index;
                }
            }
        }
        throw new Error(`label name is not defined at ${this.director.AttackLoader.runAttackPos}`);
    }
    catch (error) {
        console.log(error.message);
        return 0;
    }
}
export default searchLabel;
//# sourceMappingURL=searchLabel.js.map