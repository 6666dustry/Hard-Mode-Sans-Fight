import Keys from "../../../keys.js";
import checkType from "../checkType.js";
export default function flash(config) {
    const DATA = checkType(config, {
        duration: {
            type: "number",
            default: 500
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
            default: true
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
    }
    else {
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
//# sourceMappingURL=flash.js.map