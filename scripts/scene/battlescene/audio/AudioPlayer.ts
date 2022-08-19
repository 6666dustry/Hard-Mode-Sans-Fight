import BattleScene from "../BattleScene.js";
import router from "./router.js";
import play from "./play.js";
import stop from "./stop.js";
import Director from "../director/Director.js";
export default class AudioPlayer {
    constructor(scene: BattleScene, director: Director) {
        this.scene = scene;
        this.director = director;

        this.play = play;
        this.stop = stop;
        this.router = router;
    }
    declare scene: BattleScene;
    readonly director: Director;
    readonly router: typeof router;
    readonly play: typeof play;
    readonly stop: typeof stop;
}