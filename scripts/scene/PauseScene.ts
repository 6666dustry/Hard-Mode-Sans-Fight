import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
export default class PauseScene extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.pause);
    }
    cursors!: MoveKey;
    tKey!: Phaser.Input.Keyboard.Key;
    rtScene!: Phaser.GameObjects.RenderTexture;
    create() {
        this.tKey = this.input.keyboard.addKey("T");

        this.cursors = new MoveKey(this);
    }
    update() {
        //resume battle
        if (Phaser.Input.Keyboard.JustDown(this.tKey)) {
            this.scene.stop(Keys.Scene.pause);
            this.scene.resume(Keys.Scene.battleScene);
        }
    }
}