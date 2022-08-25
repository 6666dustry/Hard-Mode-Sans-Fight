import { AudioConfig, AudioType, PlayConfig } from "../../../Types.js";
import AudioPlayer from "./AudioPlayer.js";
import routerCall from "../router.js";
export default function router(this: AudioPlayer, config: AudioConfig, type: AudioType) {
    routerCall.call(this, config, type);
}