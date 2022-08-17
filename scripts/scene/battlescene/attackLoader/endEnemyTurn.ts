
import Keys from "../../../keys.js";
import { EndTurn } from "../../../Types.js";
import Director from "../director/Director.js";
import AttackLoader from "./attackLoader.js";
/**
 * spawn bone at left up select position.
 * @param this 
 */
function menuBone1(this: Director) {
    this.BoneDirector.addSingle({
        x: -20,
        y: this.Commands.textsPos[0].y,
        visible: true,
        length: 30,
        tween: {
            targets: this,
            props: {
                x: this.Commands.textsPos[0].x + 30
            },
            duration: 800,
            repeat: -1,
            yoyo: true,
            ease: "Quad.easeOut"
        }

    }, "menu");
}
/**
 * spawn bone at command buttons.
 * @param this 
 */
function menuBone2(this: Director) {
    let delay = 0;
    for (const iterator of this.Commands.buttonPos) {

        this.BoneDirector.addMulti({
            x: iterator.x + 60,
            y: 670,
            visible: true,
            length: 30,
            delay: 1000,
            count: -1,
            startAt: delay,
            tween: {
                targets: this,
                props: {
                    x: {
                        value: iterator.x - 60,
                        duration: 1000
                    },
                    y: {
                        value: iterator.y,
                        hold: 600,
                        duration: 200,
                        yoyo: true
                    },
                },
                ease: "Sine.easeInOut"
            }
        }, "menu");
        delay > 0 ? (delay = 0) : (delay = 500);
    }
}
/**
 * player turn initialize.
 * @param this 
 */
function endEnemyTurn(this: AttackLoader, config?: EndTurn) {
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
            duration: 4000,
            remove: true,
            onUpdate: () => {
                this.scene.children.each(
                    (child: any) => {
                        if (child.alpha) {
                            child.alpha = child.alpha - 0.01;
                        }
                    }
                );
            },
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
export default endEnemyTurn;