import type { SingleAttack } from "../../../../Types.js";
import type AttackLoader from "../attackLoader.js";
/**
 * start enemy attacks.
 * @param this 
 * @param attack set to {@link AttackLoader.loadingAttack}
 */
export default function startAttack(this: AttackLoader, attack?: SingleAttack[]) {
    const D = this.director;
    if (Array.isArray(attack)) {
        this.loadingAttack = attack;
    }

    this.SingleAttack = this.loadingAttack[this.runAttackPos];

    const DO: SingleAttack = D.searchVariable(this.SingleAttack);

    if (DO.wait && DO.wait > 0 && DO.category !== "jump") {
        this.Loading.loadAttack = this.Loading.loadAttack = this.scene.time.delayedCall(
            DO.wait, (): void => {
                this.runAttack(DO);
            }, undefined, this
        ) as typeof this.Loading.loadAttack;

    } else {
        this.runAttack(DO);
    }
}