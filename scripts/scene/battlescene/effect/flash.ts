import type { AllReadonly, FlashConfig } from "../../../Types.js";
import type Effect from "./Effect.js";
import checkType from "../checkType.js";
import Keys from "../../../keys.js";
export default function flash(this: Effect, config: AllReadonly<FlashConfig>) {
    const DATA = checkType(config, {
        duration: {
            type: "number",
            default: 350
        },
        sound: {
            type: ["string", "boolean"],
            default: "flash"
        },
        removeAll: {
            type: "boolean",
            default: false
        },
        pause: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    this.scene.cameras.cameras.forEach((value) => {
        value.setVisible(false);
    });

    if (DATA.sound) {
        this.scene.sound.play(Keys.Audio[DATA.sound]);
    }

    if (DATA.removeAll) {
        this.director.removeAll(true);
    }

    if (DATA.pause) {
        this.scene.scene.pause(Keys.Scene.battleScene);
        setTimeout(() => {
            this.scene.scene.resume(Keys.Scene.battleScene);
            this.scene.cameras.cameras.forEach((value) => {
                value.setVisible(true);
            });
            if (DATA.sound) {
                this.scene.sound.play(Keys.Audio[DATA.sound]);
            }
        }, DATA.duration);
    } else {

        this.scene.time.delayedCall(DATA.duration, () => {

            this.scene.cameras.cameras.forEach((value) => {
                value.setVisible(true);
            });
            if (DATA.sound) {
                this.scene.sound.play(Keys.Audio[DATA.sound]);
            }

        }, undefined, this);
    }
}