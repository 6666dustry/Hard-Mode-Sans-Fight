export default function startAttack(attack) {
    const D = this.director;
    if (attack) {
        this.loadingAttack = attack;
    }
    this.SingleAttack = this.loadingAttack[this.runAttackPos];
    const DO = D.searchVariable(this.SingleAttack);
    if (DO.wait && DO.wait > 0 && DO.category !== "jump") {
        this.Loading.loadAttack = this.Loading.loadAttack = this.scene.time.delayedCall(DO.wait, () => {
            this.attackPlayer(DO);
        }, undefined, this);
    }
    else {
        this.attackPlayer(DO);
    }
}
//# sourceMappingURL=startAttack.js.map