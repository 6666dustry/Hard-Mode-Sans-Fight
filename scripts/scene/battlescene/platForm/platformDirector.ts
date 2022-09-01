import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import addSingle from "./addSingle.js";
import router from "./router.js";
import update from "./directorUpdate.js";
import addMulti from "../addMulti.js";
import Base from "../director/Base.js";
export default class PlatFormDirector extends Base(Phaser.GameObjects.Group) {
    constructor(scene: BattleScene, collision: number, director: Director, heartCol: number) {
        super(scene);
        this.BaseConstructor(scene, director);
        this.collision = collision;
        this.heartCol = heartCol;

        this.repeats = [];

        scene.add.existing(this);

        this.addSingle = addSingle;
        this.addMulti = addMulti;
        this.update = update;
        this.router = router;
    }
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