import type BattleScene from "scene/battlescene/BattleScene";
import type Director from "../director/Director.js";
import type { EnemyTextType, SpeechConfig, EnemyTextConfig, AllReadonly } from "../../../Types.js";
import Keys from "../../../keys.js";
import router from "../router.js";
import checkType from "../checkType.js";
import Base from "../director/Base.js";
export default class SansText extends Base(Phaser.GameObjects.Container) {
    constructor(scene: BattleScene, x: number, y: number, zKey: Phaser.Input.Keyboard.Key, director: Director) {
        super(scene, x, y);
        this.BaseConstructor(scene, director);

        this.zKey = zKey;
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
    text: Phaser.GameObjects.Text;
    readonly speechBack: Phaser.GameObjects.Image;
    speechId!: Phaser.Time.TimerEvent;
    stopRoll(text: string): void {
        this.speechId.remove();
        this.text.setText(text);
        this.zKey.once("down", this.endSpeech.bind(this));
    }
    rollDiaText(config: Required<SpeechConfig>): Phaser.Time.TimerEvent {
        const length: number = config.text.length;
        let i: number = 0;
        let roll = this.scene.time.addEvent({
            callback: (): void => {
                this.text.setText(this.text.text + config.text[i]);

                if (config.sound && this.text.text[i] !== " ") {
                    this.scene.sound.play(Keys.Audio[config.sound]);
                }

                if (i >= length - 1) {
                    this.zKey.off("down");
                    this.zKey.once("down", this.endSpeech.bind(this));
                }
                ++i;
            },
            repeat: length - 1,
            delay: config.speed
        });

        return roll;
    }
    speech(config: AllReadonly<SpeechConfig>): void {
        const DATA = checkType(config, {
            text: "string",
            sound: {
                type: ["string", "boolean"],
                default: "sansText"
            },
            poses: {
                type: ["object", "boolean"],
                default: false
            },
            speed: {
                type: "number",
                default: 35
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
        this.speechId = this.rollDiaText(DATA);


        this.zKey.once("down", this.stopRoll.bind(this, config.text));
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