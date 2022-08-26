import BackGround from "../BackGround.js";
import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
import { BattleStartConfig } from "../Types.js";

export default class SingleSelect extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.singleSelect);
        this.selected = 0;
        this.delayTime = 0;

        this.texts = [];
        this.lastDownTime = {
            downKey: 0,
            upKey: 0
        };
    }
    zKey!: Phaser.Input.Keyboard.Key;
    xKey!: Phaser.Input.Keyboard.Key;
    cursors!: MoveKey;
    selector!: Phaser.GameObjects.Image;
    lastDownTime: {
        upKey: number,
        downKey: number;
    };
    delayTime: number;
    selected: number;
    texts: Phaser.GameObjects.Text[];
    config!: BattleStartConfig;
    BackGround!: BackGround;
    preload() { }
    create(config: BattleStartConfig) {
        this.sound.stopAll();
        this.config = config || {};

        this.xKey = this.input.keyboard.addKey("X");
        this.zKey = this.input.keyboard.addKey("Z");
        this.cursors = new MoveKey(this);

        this.BackGround = new BackGround(this);

        this.selector = this.add.image(190, 115, Keys.Image.heart);
        this.selector.setTint(0xff0000);


        const TEXT_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "battlefont",
            fontSize: "64px"
        };
        let textPos = {
            x: 150,
            y: 100
        };

        this.texts = [];

        let index: number = 0;
        phase1: for (index = 0; index < config.Phase1.length; index++) {
            const element = config.Phase1[index];
            for (const iterator of this.texts) {
                if (element.slice(0, -5) === iterator.text) {
                    continue phase1;
                }
            }

            this.texts.push((this.add.text(textPos.x, textPos.y, element.slice(0, -5), TEXT_CONFIG)));

            this.texts[this.texts.length - 1].setScale(0.5);
            textPos.y += 50;
        }

        phase1RND: for (index = 0; index < config.Phase1RND.length; index++) {
            const element = config.Phase1RND[index];

            for (const iterator of this.texts) {
                if (element.slice(0, -5) === iterator.text) {
                    continue phase1RND;
                }
            }

            this.texts.push((this.add.text(textPos.x, textPos.y, element.slice(0, -5), TEXT_CONFIG)));
            this.texts[this.texts.length - 1].setScale(0.5).setTint(0x00ff000);
            textPos.y += 50;
        }

        phase2: for (index = 0; index < config.Phase2.length; index++) {
            const element = config.Phase2[index];

            for (const iterator of this.texts) {
                if (element.slice(0, -5) === iterator.text) {
                    continue phase2;
                }
            }
            this.texts.push((this.add.text(textPos.x, textPos.y, element.slice(0, -5), TEXT_CONFIG)));

            this.texts[this.texts.length - 1].setScale(0.5).setTint(Keys.Color.blue);
            textPos.y += 50;
        }

        phase2RND: for (index = 0; index < config.Phase2RND.length; index++) {
            const element = config.Phase2RND[index];

            for (const iterator of this.texts) {
                if (element.slice(0, -5) === iterator.text) {
                    continue phase2RND;
                }
            }

            this.texts.push((this.add.text(textPos.x, textPos.y, element.slice(0, -5), TEXT_CONFIG)));

            this.texts[this.texts.length - 1].setScale(0.5).setTint(Keys.Color.orange);
            textPos.y += 50;
        }

        this.cameras.main.startFollow(this.selector, false, 0.1, 0.1, -100);

        for (const iterator of this.texts) {
            iterator.setVisible(true);
        }
    }
    update(time: number, delta: number): void {

        this.BackGround.update();

        if (!this.cursors.upIsDown) {
            this.lastDownTime.upKey = time;
        }
        if (!this.cursors.downIsDown) {
            this.lastDownTime.downKey = time;
        }


        const DELAY = 750;

        if (this.cursors.upIsJustDown || (this.lastDownTime.upKey < time - DELAY && this.delayTime > 4)) {
            this.selected <= 0 || this.selected--;
            this.sound.play(Keys.Audio.cursor);

            this.delayTime = 0;
            if (this.cursors.upIsJustDown) {
                this.lastDownTime.upKey = time;
            }
        }

        if (this.cursors.downIsJustDown || (this.lastDownTime.downKey < time - DELAY && this.delayTime > 4)) {
            this.selected >= this.texts.length - 1 || this.selected++;

            this.sound.play(Keys.Audio.cursor);

            this.delayTime = 0;
            if (this.cursors.downIsJustDown) {
                this.lastDownTime.downKey = time;
            }
        }

        this.delayTime++;

        this.selector.setPosition(this.texts[this.selected].x - 30, this.texts[this.selected].y + 15);

        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            this.config.single = true;
            this.config.singleAttack = `${ this.texts[this.selected].text }.json`;
            this.scene.start(Keys.Scene.battleScene, this.config);
        }

        if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            this.config.single = false;
            this.config.singleAttack = undefined;
            this.scene.start(Keys.Scene.mainMenu, this.config);
        }
    }
}