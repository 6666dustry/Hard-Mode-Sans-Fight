import Keys from "../../../keys.js";
function flash(config) {
    this.scene.cameras.main.setVisible(false);
    this.scene.sound.play(Keys.Audio[config.sound || "flash"]);
    if (config.removeAll) {
        this.director.removeAll(true);
    }
    if (config.pause) {
        this.scene.scene.pause(Keys.Scene.battleScene);
        setTimeout(() => {
            this.scene.scene.resume(Keys.Scene.battleScene);
        }, config.duration || 250);
    }
    this.scene.time.delayedCall(config.duration || 250, () => {
        this.scene.cameras.main.setVisible(true);
        this.scene.sound.play(Keys.Audio[config.sound || "flash"]);
    }, undefined, this);
}
export default flash;
//# sourceMappingURL=flash.js.map