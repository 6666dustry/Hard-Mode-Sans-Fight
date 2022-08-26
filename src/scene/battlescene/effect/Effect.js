import router from "./router.js";
import flash from "./flash.js";
import falling from "./falling.js";
import removeAll from "./removeAll.js";
export default class Effect {
    constructor(scene, director) {
        this.scene = scene;
        this.director = director;
        this.flash = flash;
        this.falling = falling;
        this.removeAll = removeAll;
        this.router = router;
    }
    scene;
    director;
    flash;
    router;
    falling;
    removeAll;
    fallingEnd;
}
//# sourceMappingURL=Effect.js.map