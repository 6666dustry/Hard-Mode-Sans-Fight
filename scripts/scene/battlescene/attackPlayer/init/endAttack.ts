import type { EndTurn } from "../../../../Types.js";
import type AttackLoader from "../attackLoader.js";
import checkType from "../../checkType.js";
import Practice from "./Practice.js";
/**
 * turn end initialize.
 * @param this 
 * @param config 
 */
export default function endAttack(this: AttackLoader, config: EndTurn) {

    //remove waiting attack.
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

    this.first = false;
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

            if (this.endConfig.endPhase) {
                this.nextPhase();
            }

            Practice.endAttack(D);
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
                    },
                    playBGM: {
                        type: "boolean",
                        default: false
                    },
                    stopBGM: {
                        type: "boolean",
                        default: false
                    },
                    endPhase: {
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