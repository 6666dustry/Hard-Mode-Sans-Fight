import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import router from "./router.js";
import play from "./play.js";
import stop from "./stop.js";
import Base from "../director/Base.js";
export default class AudioPlayer extends Base(class { }) {
    constructor(scene: BattleScene, director: Director) {
        super();
        this.BaseConstructor(scene, director);

        this.play = play;
        this.stop = stop;
        this.router = router;
    }
    readonly router: typeof router;
    readonly play: typeof play;
    readonly stop: typeof stop;
}