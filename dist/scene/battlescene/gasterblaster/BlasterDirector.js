import GasterBlaster from "./GasterBlaster.js";
import Keys from "../../../keys.js";
import router from "../router.js";
export default class BlasterDirector extends Phaser.GameObjects.Group {
    constructor(scene, collision, OPERATOR) {
        super(scene);
        this.#collision = collision;
        this.director = OPERATOR;
        scene.add.existing(this);
        /** set frame late*/
        const ANIM_DURATION = 200;
        scene.anims.create({
            key: Keys.Anim.blastStart,
            frames: [{
                    key: Keys.Sheet.blaster,
                    frame: "compound",
                }, {
                    key: Keys.Sheet.blaster,
                    frame: "double"
                }],
            duration: ANIM_DURATION,
        });
        scene.anims.create({
            key: Keys.Anim.blasting,
            frames: [
                {
                    key: Keys.Sheet.blaster,
                    frame: "left",
                },
                {
                    key: Keys.Sheet.blaster,
                    frame: "right",
                }
            ],
            duration: ANIM_DURATION / 2,
            repeat: -1
        });
    }
    #collision;
    director;
    addSingle(Config) {
        let result;
        result = new GasterBlaster(this.scene, Config, this.#collision, this.director);
        this.add(result);
        return result;
    }
    router(config, type) {
        router.call(this, config, type);
    }
    update(time, delta) {
        if (this.getChildren()[0]) {
            for (const iterator of this.getChildren()) {
                iterator.update(time, delta);
            }
        }
    }
    playerTurnInit() {
        this.clear(false, true);
    }
    ;
}
//# sourceMappingURL=BlasterDirector.js.map