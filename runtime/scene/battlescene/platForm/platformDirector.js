import addSingle from "./addSingle.js";
import router from "./router.js";
import update from "./directorUpdate.js";
import addMulti from "../addMulti.js";
export default class PlatFormDirector extends Phaser.GameObjects.Group {
    constructor(scene, collision, DIRECTOR, heartCol) {
        super(scene);
        this.director = DIRECTOR;
        this.collision = collision;
        this.heartCol = heartCol;
        this.repeats = [];
        scene.add.existing(this);
        this.addSingle = addSingle;
        this.addMulti = addMulti;
        this.update = update;
        this.router = router;
    }
    director;
    collision;
    heartCol;
    repeats;
    addSingle;
    addMulti;
    update;
    router;
    clear(removeFromScene, destroyChild) {
        this.scene.tweens.killTweensOf(this.getChildren());
        super.clear(removeFromScene, destroyChild);
        for (const iterator of this.repeats) {
            iterator.remove();
        }
        return this;
    }
}
//# sourceMappingURL=platformDirector.js.map