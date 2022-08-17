import BackGround from "../../backGround.js";
import Director from "./director/Director.js";
import Keys from "../../keys.js";
import MoveKey from "../../MoveKey.js";
import { BattleStartConfig } from "../../Types.js";
export default class BattleScene extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.battleScene);
        this.color = 0;
    }
    zKey!: Phaser.Input.Keyboard.Key;
    xKey!: Phaser.Input.Keyboard.Key;
    //debug only.
    /**stop time */
    tKey!: Phaser.Input.Keyboard.Key;
    //debug only.
    /**restore health */
    hKey!: Phaser.Input.Keyboard.Key;

    dKey!: Phaser.Input.Keyboard.Key;

    cursors!: MoveKey;
    director!: Director;
    color: number;
    BGM!: any;
    config!: BattleStartConfig;
    BackGround!: BackGround;
    preload(): void {
    }
    init(): void { }
    create(config: BattleStartConfig): void {
        this.config = config;

        this.xKey = this.input.keyboard.addKey("X");
        this.zKey = this.input.keyboard.addKey("Z");
        this.tKey = this.input.keyboard.addKey("T");
        this.hKey = this.input.keyboard.addKey("H");
        this.dKey = this.input.keyboard.addKey("D");

        this.cursors = new MoveKey(this);

        this.director = new Director(this, this.cursors, this.xKey, this.zKey);

        this.BackGround = new BackGround(this);

        this.matter.world.setBounds();
        this.director.startGame(this.config.single);
        console.log(this);
    }
    update(time: number, fps: number): void {
        this.director.update(time, fps);
        this.BackGround.update();
    }
}