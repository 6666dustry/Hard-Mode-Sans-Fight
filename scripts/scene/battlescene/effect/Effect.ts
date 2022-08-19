import BattleScene from "../BattleScene.js";
import Director from "../director/Director.js";
import router from "./router.js";
import flash from "./flash.js";
import falling from "./falling.js";
export default class Effect {
    constructor(scene: BattleScene, director: Director) {
        this.scene = scene;
        this.director = director;

        this.flash = flash;
        this.falling = falling;
        this.router = router;
    }
    readonly scene: BattleScene;
    readonly director: Director;
    readonly flash: typeof flash;
    readonly router: typeof router;
    readonly falling: typeof falling;
}