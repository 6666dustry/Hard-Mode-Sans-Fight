
import Keys from "../../../keys.js";
import { EndTurn } from "../../../Types.js";
import { menuBone1, menuBone2 } from "./menuBones.js";
import AttackLoader from "./attackLoader.js";
/**
 * player turn initialize.
 * @param this 
 */
export default function endEnemyTurn(this: AttackLoader, config?: EndTurn) {
    this.playerTurn = true;

    if (config) {
        if (this.endConfig) {
            for (const key in config) {
                if (Object.prototype.hasOwnProperty.call(config, key)) {
                    const element = config[key as keyof EndTurn];
                    if (element != null) {
                        this.endConfig[key as keyof EndTurn] = element as any;
                    }
                }
            }
        } else {
            this.endConfig = config;
        }

    }


    if (this.first) {
        this.first = false;
        this.scene.sound.play(Keys.Audio.BGM, {
            loop: true
        });
    }

    this.director.removeAll();

    //is game cleared?
    if (this.endConfig && this.endConfig.win) {

        this.scene.scene.transition({
            target: Keys.Scene.mainMenu,
            remove: true,
            onUpdate: () => {
                let appear = true;
                this.scene.cameras.cameras.forEach((value) => {
                    value.alpha -= 0.01;
                    if (value.alpha > 0) {
                        appear = false;
                    }
                });
                if (appear) {
                    this.scene.scene.setVisible(true, Keys.Scene.mainMenu);
                    this.scene.scene.get(Keys.Scene.mainMenu).cameras.cameras.forEach((value) => {
                        value.alpha += 0.01;
                    });
                }
            },
            duration: 5000,
            data: [this.scene.config]
        });
        this.scene.scene.setVisible(false, Keys.Scene.mainMenu);
        this.scene.scene.get(Keys.Scene.mainMenu).cameras.cameras.forEach((value) => {
            value.alpha = 0;
        });
    }



    // start player turn.
    else {

        const D = this.director;

        D.Heart.playerTurnInit();
        D.CombatzoneDirector.setRectDefault();
        D.Commands.playerTurnInit();

        if (this.endConfig) {

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
}