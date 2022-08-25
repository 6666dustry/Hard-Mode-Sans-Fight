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
        this.scene.sound.stopByKey(Keys.Audio.BGM);
        this.scene.sound.play(Keys.Audio.BGM, {
            loop: true
        });

        D.CombatzoneDirector.setRectDefault(true);

        this.attackName = this.scene.config.singleAttack as string;

        data = this.scene.cache.json.get(this.scene.config.singleAttack as string);

        this.startAttack(data.attacks);
    } else {

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