import BattleScene from "scene/battlescene/BattleScene";
import Keys from "../../../keys.js";
import Director from "../director/Director.js";
import { EnemyTextType, SpeechConfig, EnemyTextConfig, AllReadonly } from "../../../Types.js";
import router from "../router.js";
import checkType from "../checkType.js";
export default class SansText extends Phaser.GameObjects.Container {
    constructor(scene: BattleScene, x: number, y: number, zKey: Phaser.Input.Keyboard.Key, OPERATOR: Director) {
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
    readonly zKey: Phaser.Input.Keyboard.Key;
    readonly director: Director;
    text: Phaser.GameObjects.Text;
    speechBack: Phaser.GameObjects.Image;
    speechId!: Phaser.Time.TimerEvent;
    #setTextInst(text: string): void {
        this.speechId.remove();
        this.text.setText(text);
        this.zKey.once("down", this.endSpeech.bind(this));
    }
    rollDiaText(text: string): Phaser.Time.TimerEvent {
        const length: number = text.length;
        let i: number = 0;

        return this.scene.time.addEvent({
            callback: (): void => {
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
    speech(config: AllReadonly<SpeechConfig>): void {
        const DATA = checkType(config, {
            text: "string",
            poses: {
                type: ["object", "boolean"],
                default: false
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
    endSpeech(): void {
        if (this.scene === undefined) {
            return;
        }
        this.setActive(false);
        this.setVisible(false);
        this.director.AttackLoader.startAttack();
    }
    router(config: EnemyTextConfig, type: EnemyTextType) {
        router.call(this, config, type);
    }
}