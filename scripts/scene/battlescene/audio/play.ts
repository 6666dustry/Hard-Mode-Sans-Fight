import { PlayConfig } from "../../../Types.js";
import AudioPlayer from "./AudioPlayer.js";
import Keys from "../../../keys.js";

export default function play(this: AudioPlayer, config: PlayConfig) {
    this.scene.sound.play(Keys.Audio[config.sound], config.extra);
}