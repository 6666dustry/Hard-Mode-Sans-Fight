import { StopConfig } from "../../../Types.js";
import AudioPlayer from "./AudioPlayer.js";
import Keys from "../../../keys.js";

function stop(this: AudioPlayer, config: StopConfig) {
    this.scene.sound.stopByKey(Keys.Audio[config.sound]);
}
export default stop;