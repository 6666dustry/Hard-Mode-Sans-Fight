import BackGround from "../../BackGround.js";
import Director from "./director/Director.js";
import Keys from "../../keys.js";
import MoveKey from "../../MoveKey.js";
export default class BattleScene extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.battleScene);
        this.color = 0;
    }
    zKey;
    xKey;
    //debug only.
    /**stop time */
    tKey;
    //debug only.
    /**restore health */
    hKey;
    dKey;
    cursors;
    director;
    color;
    BGM;
    config;
    BackGround;
    preload() {
    }
    init() { }
    create(config) {
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
    update(time, fps) {
        this.director.update(time, fps);
        this.BackGround.update();
    }
}
//# sourceMappingURL=BattleScene.js.map