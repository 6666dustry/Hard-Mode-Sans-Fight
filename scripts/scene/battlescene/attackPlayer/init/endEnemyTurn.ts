import type { EndTurn } from "../../../../Types.js";
import type AttackLoader from "../attackLoader.js";
import Keys from "../../../../keys.js";
import { menuBone1, menuBone2 } from "./menuBones.js";
import gameClear from "../gameClear.js";
/**
 * player turn initialize.
 * @param this 
 */
export default function endEnemyTurn(this: AttackLoader, config?: EndTurn) {
    this.playerTurn = true;


    if (config) {
        for (const key in config) {
            if (Object.prototype.hasOwnProperty.call(config, key)) {
                const element = config[key as keyof EndTurn];
                if (element != null) {
                    this.endConfig[key as keyof EndTurn] = element as any;
                }
            }
        }
    }


    this.director.removeAll();

    //is game cleared?
    if (this.endConfig.win) {
        gameClear(this.scene, this.scene.config);
    } else {
        // start player turn.
        const D = this.director;

        D.Heart.playerTurnInit();
        D.CombatzoneDirector.setRectDefault();

        if (this.endConfig.endPhase) {
            this.endConfig.endPhase = false;
            this.resting = true;
        }

        D.Commands.playerTurnInit();


        if (this.endConfig.stopBGM) {
            this.scene.sound.stopByKey(Keys.Audio.BGM);
            this.endConfig.stopBGM = false;
        }

        if (this.endConfig.playBGM) {
            this.endConfig.playBGM = false;
            this.scene.sound.play(Keys.Audio.BGM, {
                loop: true
            });
        }

        if (this.endConfig.setSansVisual) {
            D.Sans.setVisual(this.endConfig.setSansVisual);

            delete this.endConfig.setSansVisual;
        }

        if (this.endConfig.menuBone) {
            switch (this.endConfig.menuBone) {
                case 1: {
                    menuBone1.call(D);
                    break;
                }
                case 2: {
                    menuBone2.call(D);
                    break;
                }

                case 3: {

                    menuBone1.call(D);
                    menuBone2.call(D);
                    break;
                }
            }
        }

    }
}
