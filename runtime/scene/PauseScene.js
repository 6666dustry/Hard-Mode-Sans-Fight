import Keys from "../keys.js";
import MoveKey from "../MoveKey.js";
export default class PauseScene extends Phaser.Scene {
    constructor() {
        super(Keys.Scene.pause);
    }
    cursors;
    tKey;
    rtScene;
    create() {
        this.tKey = this.input.keyboard.addKey("T");
        //this.rtScene = this.add.renderTexture(0, 0, this.scale.width, this.scale.height);
        //this.scene.setVisible(false, Keys.scene.battleScene);
        this.cursors = new MoveKey(this);
    }
    update() {
        /*var gameScene = this.scene.get(Keys.scene.battleScene);

        this.rtScene.clear();

        this.rtScene.draw(gameScene.children, 0, 0);*/
        //resume battle
        if (Phaser.Input.Keyboard.JustDown(this.tKey)) {
            this.scene.stop(Keys.Scene.pause);
            this.scene.resume(Keys.Scene.battleScene);
        }
    }
}
//# sourceMappingURL=PauseScene.js.map