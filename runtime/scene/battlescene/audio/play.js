import Keys from "../../../keys.js";
function play(config) {
    this.scene.sound.play(Keys.Audio[config.sound], config.extra);
}
export default play;
//# sourceMappingURL=play.js.map