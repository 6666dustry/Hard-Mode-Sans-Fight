import router from "./router.js";
import flash from "./flash.js";
import falling from "./falling.js";
class Effect {
    constructor(scene, director) {
        this.scene = scene;
        this.director = director;
        this.flash = flash;
        this.falling = falling;
        this.router = router;
    }
    scene;
    director;
    flash;
    router;
    falling;
}
export default Effect;
//# sourceMappingURL=Effect.js.map