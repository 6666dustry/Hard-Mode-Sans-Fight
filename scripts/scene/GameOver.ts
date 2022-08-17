import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
import { BattleStartConfig } from "../Types.js";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.gameOver);
        this.selected = 0;
        this.buttons = [];
        this.canMove = false;
    }
    zKey!: Phaser.Input.Keyboard.Key;
    selector!: Phaser.GameObjects.Image;
    buttons: Phaser.GameObjects.Text[];
    cursors!: MoveKey;
    selected: number;
    shards!: Phaser.GameObjects.Particles.ParticleEmitterManager;
    heart!: Phaser.GameObjects.Image;
    canMove: boolean;
    config!: BattleStartConfig;
    create(deadConfig: {
        x: number, y: number;
        config: BattleStartConfig;
    }) {
        this.config = deadConfig.config;
        this.selected = 0;
        this.canMove = false;

        this.cursors = new MoveKey(this);
        this.zKey = this.input.keyboard.addKey("Z");
        this.heart = this.add.image(deadConfig.x, deadConfig.y, Keys.Image.heart).setTint(0xff0000);

        this.time.addEvent({
            delay: 1000,
            callback: this.secondCreate,
            callbackScope: this,
            args: [deadConfig]
        });

        this.time.addEvent({
            delay: 2000,
            callback: this.thirdCreate,
            callbackScope: this
        });
    }
    secondCreate(heartPos: { x: number, y: number; }) {
        this.sound.play(Keys.Audio.split);
        this.heart.setTexture(Keys.Image.break).setTint(0xff0000);

        //make shard particles.
        this.shards = this.add.particles(Keys.Sheet.shard, undefined, {
            frame: ["shard1", "shard2", "shard3"],
            x: heartPos.x,
            y: heartPos.y,
            speed: 200,
            gravityY: 200,
            lifespan: 4000,
            scale: 1,
            delay: 1000,
            maxParticles: 5,
            rotate: {
                start: -360 * 5, end: 360 * 5,
                random: true
            },
        }).setVisible(false);
    }
    thirdCreate() {
        this.shards.setVisible(true);
        this.sound.play(Keys.Audio.shatter);

        this.canMove = true;
        this.heart.setVisible(false);
        const TEXCON = {
            fontFamily: "battlefont",
            fontSize: "128px",
        };

        this.add.text(320, 140, "GAME\nOVER", TEXCON).setOrigin(0.5);

        this.buttons[0] = this.add.text(170, 310, "retry", TEXCON).setOrigin(0.5).setScale(0.4);

        this.buttons[1] = this.add.text(470, 310, "return\nthe menu", TEXCON).setOrigin(0.5).setScale(0.4);

        this.selector = this.add.image(170, 310, Keys.Image.heart).setTint(0xff0000);
    }
    update(time: number, delta: number): void {
        if (this.canMove) {
            const cursor: MoveKey = this.cursors;

            const JustDown: typeof Phaser.Input.Keyboard.JustDown = Phaser.Input.Keyboard.JustDown;

            if (this.cursors.leftIsJustDown || this.cursors.rightIsJustDown) {

                //switch select.
                this.selected = (this.selected === 0 ? 1 : 0);

                const X: number = this.buttons[this.selected].x
                    , Y: number = this.buttons[this.selected].y;

                this.selector.setPosition(X, Y);
                this.sound.play(Keys.Audio.cursor);
            }
            if (JustDown(this.zKey)) {
                switch (this.selected) {
                    case 0:
                        this.scene.start(Keys.Scene.battleScene, this.config);
                        break;

                    case 1:
                        this.scene.start(Keys.Scene.mainMenu, this.config);
                        break;

                    default:
                        break;
                }
            }

            for (const iterator of this.buttons) {
                iterator.setTint(0xffffff);
            }
            this.buttons[this.selected].setTint(0xffff00);
        }
    }
}