import router from "./router.js";
import play from "./play.js";
import stop from "./stop.js";
export default class AudioPlayer {
    constructor(scene, director) {
        this.scene = scene;
        this.director = director;
        this.play = play;
        this.stop = stop;
        this.router = router;
    }
    director;
    router;
    play;
    stop;
}
//# sourceMappingURL=AudioPlayer.js.map