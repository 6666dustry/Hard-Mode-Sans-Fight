import BackGround from "../BackGround.js";
import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
import type { BattleStartConfig } from "../Types.js";

export default class Setting extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.setting);
        this.settings = {
            easyMode: false,
            infHP: false,
            infItem: false,
            phase2: false,
            practice: false,
            noKr: false,
            ignoreKr: false
        };

        this.selected = 0;
        this.texts = [];
    }
    cursors!: MoveKey;
    zKey!: Phaser.Input.Keyboard.Key;
    xKey!: Phaser.Input.Keyboard.Key;
    selector!: Phaser.GameObjects.Image;
    config!: BattleStartConfig;
    settings: Required<NonNullable<BattleStartConfig["settings"]>>;
    texts: Phaser.GameObjects.Text[];
    selected: number;
    BackGround!: BackGround;
    create(config: BattleStartConfig) {
        this.config = config;

        this.BackGround = new BackGround(this);

        this.config.settings = this.settings;
        this.xKey = this.input.keyboard.addKey("X");
        this.zKey = this.input.keyboard.addKey("Z");

        this.cursors = new MoveKey(this);

        this.selector = this.add.image(190, 115, Keys.Image.heart);
        this.selector.setTint(0xff0000);

        this.texts = [];

        let textPos = {
            x: 220, y: 150
        };
        const TEXCON = {
            fontFamily: "battlefont",
            fontSize: "64px",
        };


        for (let index = 0; index < Object.keys(this.settings).length; index++) {
            const element = Object.keys(this.settings)[index];
            const TEXT = this.add.text(textPos.x, textPos.y, element, TEXCON).setScale(0.5);
            this.texts.push(TEXT);

            if (this.settings[element as keyof typeof this.settings]) {
                TEXT.setTint(0x00ff00);
            }

            textPos.y += 50;
        }

        this.tweens.add({
            targets: this.texts[this.selected],
            props: {
                scaleX: 0.6,
                scaleY: 0.6
            },
            duration: 100
        });
        this.cameras.main.startFollow(this.selector, false, 0.1, 0.1, -100);
    }
    update() {
        this.BackGround.update();

        if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            this.sound.play(Keys.Audio.select);
            this.scene.start(Keys.Scene.mainMenu, this.config);
        }

        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            this.sound.play(Keys.Audio.select);

            let key = Object.keys(this.settings)[this.selected];

            const V = this.settings[key as keyof typeof this.settings] = !this.settings[key as keyof typeof this.settings];

            if (V) {
                this.texts[this.selected].setTint(0x00ff00);
            } else {
                this.texts[this.selected].setTint(0xffffff);
            }
        }

        if (this.cursors.downIsJustDown) {
            if (!(this.selected >= this.texts.length - 1)) {

                this.tweens.add({
                    targets: this.texts[this.selected],
                    props: {
                        scaleX: 0.5,
                        scaleY: 0.5
                    },
                    duration: 100
                });

                this.selected++;
                this.sound.play(Keys.Audio.cursor);

                this.tweens.add({
                    targets: this.texts[this.selected],
                    props: {
                        scaleX: 0.6,
                        scaleY: 0.6
                    },
                    duration: 100
                });
            }
        }

        if (this.cursors.upIsJustDown) {
            if (!(this.selected <= 0)) {

                this.tweens.add({
                    targets: this.texts[this.selected],
                    props: {
                        scaleX: 0.5,
                        scaleY: 0.5
                    },
                    duration: 100
                });

                this.selected--;
                this.sound.play(Keys.Audio.cursor);

                this.tweens.add({
                    targets: this.texts[this.selected],
                    props: {
                        scaleX: 0.6,
                        scaleY: 0.6
                    },
                    duration: 100
                });
            }
        }

        this.selector.setPosition(this.texts[this.selected].x - 30, this.texts[this.selected].y + 15);
    }
}