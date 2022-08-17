import BattleScene from "../BattleScene.js";
import Director from "../director/Director.js";
import addSingle from "./addSingle.js";
import router from "./router.js";
import update from "./directorUpdate.js";
import addMulti from "../addMulti.js";
class PlatFormDirector extends Phaser.GameObjects.Group {
    constructor(scene: BattleScene, collision: number, DIRECTOR: Director, heartCol: number) {
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
    declare scene: BattleScene;
    readonly director: Director;
    readonly collision: number;
    readonly heartCol;
    repeats: Phaser.Time.TimerEvent[];
    readonly addSingle: typeof addSingle;
    readonly addMulti: typeof addMulti;
    readonly update: typeof update;
    readonly router: typeof router;
    clear(removeFromScene?: boolean | undefined, destroyChild?: boolean | undefined): this {
        this.scene.tweens.killTweensOf(this.getChildren());

        super.clear(removeFromScene, destroyChild);

        for (const iterator of this.repeats) {
            iterator.remove();
        }

        return this;
    }
}
export default PlatFormDirector; 