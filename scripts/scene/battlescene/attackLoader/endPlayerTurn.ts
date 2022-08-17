import Keys from "../../../keys.js";
import AttackLoader from "./attackLoader.js";
/**
 * enemy turn initialize
 * @param this 
 * @param single 
 */
export default function endPlayerTurn(this: AttackLoader, single?: boolean): void {
    const D = this.director;
    D.Commands.endPlayerTurn();
    D.Heart.enemyTurnInit();

    this.playerTurn = false;
    this.runAttackPos = 0;
    D.removeAll();
    //is single mode?
    if (single != null) {
        this.playSingle = single;
    } else {
        this.playSingle = false;
    }

    let data: any;
    //option of single mode.
    if (this.playSingle) {
        this.scene.sound.play(Keys.Audio.BGM, {
            loop: true
        });

        D.CombatzoneDirector.setRectDefault(true);

        this.attackName = this.scene.config.singleAttack as string;

        data = this.scene.cache.json.get(this.scene.config.singleAttack as string);

        this.startAttack(data.attacks);
    } else {

        //is phase ended?
        if (!this.first && (this.resting || this.loadFilePos + 1 >= this.getPhaseLength())) {

            this.resting = true;
            this.scene.sound.stopByKey(Keys.Audio.BGM);

            D.Sans.setVisual({
                state: "tired"
            });

            this.scene.time.delayedCall(
                700, this.endEnemyTurn,
                undefined, this
            );
        } else {
            //first special attack.
            if (this.first) {
                data = this.catchAttack();
            } else {
                if (this.attacked) {
                    this.attacked = false;
                    this.loadFilePos++;
                    data = this.catchAttack();
                } else {
                    data = this.catchRND();
                }
            }
            if (!this.resting) {
                this.startAttack(data.attacks);
            }
        }
    }
}