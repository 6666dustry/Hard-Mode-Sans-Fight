import Keys from "../../../keys.js";
export default function play(config) {
    this.scene.sound.stopByKey(Keys.Audio[config.sound]);
    this.scene.sound.play(Keys.Audio[config.sound], config.extra);
}
//# sourceMappingURL=play.js.map