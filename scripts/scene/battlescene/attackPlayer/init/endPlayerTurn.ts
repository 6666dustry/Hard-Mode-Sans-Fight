import type AttackLoader from "../attackLoader.js";
import Single from "./Single.js";
/**
 * enemy turn initialize
 * @param this 
 * @param single 
 */
export default function endPlayerTurn(this: AttackLoader, single?: boolean): void {
    const D = this.director;
    D.Commands.endPlayerTurn();
    D.Heart.enemyTurnInit();
    D.removeAll();

    this.playerTurn = false;
    this.runAttackPos = 0;
    //is single mode?
    if (single != null) {
        this.playSingle = single;
    } else {
        this.playSingle = false;
    }

    let data: any;
    //option of single mode.
    if (this.playSingle) {
        Single.reload(this.scene, this.director);
        this.startAttack();
    } else {
        if (this.attacked && this.resting) {
            this.resting = false;
            this.nextPhase();
        }

        if (this.resting) {
            this.scene.time.delayedCall(
                700, this.endEnemyTurn,
                undefined, this
            );
        } else {
            data = this.getAttack();
            this.startAttack(data.attacks);
        }
    }
}