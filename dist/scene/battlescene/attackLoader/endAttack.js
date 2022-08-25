import checkType from "../checkType.js";
import Practice from "./practice.js";
/**
 * turn end initialize.
 * @param this
 * @param config
 */
export default function endAttack(config) {
    this.first = false;
    for (const key in this.Loading) {
        if (Object.prototype.hasOwnProperty.call(this.Loading, key)) {
            const element = this.Loading[key];
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
    }
    else {
        //option of practice mode.
        if (this.scene.config.settings && this.scene.config.settings.practice) {
            this.attacked = true;
            if (this.endConfig.endPhase) {
                this.phase++;
                this.endConfig.endPhase = false;
                this.loadFilePos = -1;
            }
            D.Sans.x = 320;
            D.Statuses.hp = D.Statuses.maxHp;
            D.Statuses.kr = 0;
            D.Statuses.setDisplay();
            D.removeAll();
            D.Heart.enemyTurnInit();
            D.CombatzoneDirector.setRectDefault(true);
            this.endPlayerTurn();
        }
        else {
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
            }
            else {
                this.endEnemyTurn();
            }
        }
    }
}
//# sourceMappingURL=endAttack.js.map