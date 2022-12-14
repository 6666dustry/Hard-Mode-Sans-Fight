import type Director from "../director/Director.js";
import type BattleScene from "../BattleScene.js";
import type { BlasterConfig, BlasterType } from "../../../Types.js";
import GasterBlaster from "./GasterBlaster.js";
import Keys from "../../../keys.js";
import router from "../router.js";
import Base from "../director/Base.js";
export default class BlasterDirector extends Base(Phaser.GameObjects.Group) {
    constructor(scene: BattleScene, collision: number, director: Director) {
        super(scene);
        this.BaseConstructor(scene, director);
        this.collision = collision;
        this.director = director;

        scene.add.existing(this);

        /** set frame late*/
        const ANIM_DURATION: number = 200;
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
                }],
            duration: ANIM_DURATION / 2,
            repeat: -1
        });
    }
    readonly collision: number;
    addSingle(Config: BlasterConfig): GasterBlaster {
        let result: GasterBlaster;
        result = new GasterBlaster(this.scene as BattleScene, Config, this.collision, this.director);
        this.add(result);
        return result;
    }
    router(config: BlasterConfig, type: BlasterType) {
        router.call(this, config, type);
    }
    update(time: number, delta: number): void {
        if (this.getChildren()[0]) {
            for (const iterator of this.getChildren() as GasterBlaster[]) {
                iterator.update(time, delta);
            }
        }
    }
    playerTurnInit(): void {
        this.clear(false, true);
    };
}