import { EndTurn } from "../../../Types.js";
import AttackLoader from "./attackLoader.js";
import Keys from "../../../keys.js";
import checkType from "../checkType.js";
import Practice from "./practice.js";
/**
 * turn end initialize.
 * @param this 
 * @param config 
 */
export default function endAttack(this: AttackLoader, config: EndTurn) {

    for (const key in this.Loading) {
        if (Object.prototype.hasOwnProperty.call(this.Loading, key)) {
            const element = this.Loading[key as keyof typeof this.Loading];
            if (element) {
                element.remove();
            }
        }
    }

    //option of practice mode.
    if (this.scene.config.settings && this.scene.config.settings.practice) {

        Practice.showPassed(this.scene, true);

    }

    this.runAttackPos = 0;
    const D = this.director;


    //option of single attack 
    if (this.playSingle) {


        D.removeAll();
        D.Heart.enemyTurnInit();
        D.CombatzoneDirector.setRectDefault(true);

        this.startAttack();


    } else {
        //option of practice mode.
        if (this.scene.config.settings && this.scene.config.settings.practice) {

            this.attacked = true;
            if (this.first) {
                this.scene.sound.play(Keys.Audio.BGM, {
                    loop: true
                });
            }
            if (this.isPhaseEnd()) {
                this.phase++;
                this.loadFilePos = -1;
            }

            D.Sans.x = 320;

            D.Statuses.hp = D.Statuses.maxHp;
            D.Statuses.kr = 0;
            D.Statuses.setDisplay();

            this.first = false;

            D.removeAll();
            D.Heart.enemyTurnInit();
            D.CombatzoneDirector.setRectDefault(true);
            this.endPlayerTurn();


        } else {
            if (config) {
                const DATA = checkType(config, {
                    menuBone: {
                        type: "number",
                        default: 0
                    },
                    setSansVisual: {
                        type: ["object", "boolean"],
                        default: false
                    },
                    win: {
                        type: "boolean",
                        default: false
                    }
                }, this.director.AttackLoader.runAttackPos);
                this.endEnemyTurn(DATA);
            } else {
                this.endEnemyTurn();
            }
        }
    }
}