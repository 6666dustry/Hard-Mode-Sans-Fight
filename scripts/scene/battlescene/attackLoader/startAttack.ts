import { SingleAttack } from "../../../Types.js";
import AttackLoader from "./attackLoader.js";
export default function startAttack(this: AttackLoader, attack?: SingleAttack[]) {
    const D = this.director;
    if (attack) {
        this.loadingAttack = attack;
    }

    this.SingleAttack = this.loadingAttack[this.runAttackPos];

    const DO: SingleAttack = D.searchVariable(this.SingleAttack);

    if (DO.wait && DO.wait > 0 && DO.category !== "jump") {
        this.Loading.loadAttack = this.Loading.loadAttack = this.scene.time.delayedCall(
            DO.wait, (): void => {
                this.loadAttack(DO);
            }, undefined, this
        ) as typeof this.Loading.loadAttack;

    } else {
        this.loadAttack(DO);
    }
}