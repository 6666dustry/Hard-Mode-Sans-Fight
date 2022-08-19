import Keys from "../../../keys.js";
import router from "../router.js";
import checkType from "../checkType.js";
export default class SansText extends Phaser.GameObjects.Container {
    constructor(scene, x, y, zKey, OPERATOR) {
        super(scene, x, y);
        this.zKey = zKey;
        this.director = OPERATOR;
        this.speechBack = scene.add.image(0, 0, Keys.Image.speech);
        this.text = scene.add.text(-80, -40, "", {
            fontFamily: "comicsansfont",
            color: "#000",
            fontSize: "14px",
        });
        this.add([this.speechBack, this.text]);
        scene.add.existing(this);
        this.setDepth(Keys.Depth.sansText);
        this.setActive(false);
        this.setVisible(false);
    }
    zKey;
    director;
    text;
    speechBack;
    speechId;
    #setTextInst(text) {
        this.speechId.remove();
        this.text.setText(text);
        this.zKey.once("down", this.endSpeech.bind(this));
    }
    rollDiaText(text) {
        const length = text.length;
        let i = 0;
        return this.scene.time.addEvent({
            callback: () => {
                this.text.text += text[i];
                this.scene.sound.play(Keys.Audio.battleText);
                this.scene.sound.play(Keys.Audio.sansText);
                if (i >= length - 1) {
                    this.zKey.off("down");
                    this.zKey.once("down", this.endSpeech.bind(this));
                }
                ++i;
            },
            repeat: length - 1,
            delay: 35
        });
    }
    speech(config) {
        const DATA = checkType(config, {
            text: "string",
            poses: {
                type: "object",
                default: undefined
            }
        }, this.director.AttackLoader.runAttackPos);
        if (this.scene === undefined) {
            return;
        }
        if (DATA.poses) {
            this.director.Sans.setVisual(DATA.poses);
        }
        this.setPosition(this.director.Sans.x + 170, this.director.Sans.y - this.director.Sans.torso.displayHeight);
        this.setActive(true);
        this.setVisible(true);
        this.text.setText("");
        this.speechId = this.rollDiaText(DATA.text);
        this.zKey.once("down", this.#setTextInst.bind(this, config.text));
    }
    endSpeech() {
        if (this.scene === undefined) {
            return;
        }
        this.setActive(false);
        this.setVisible(false);
        this.director.AttackLoader.startAttack();
    }
    router(config, type) {
        router.call(this, config, type);
    }
}
//# sourceMappingURL=SansText.js.map