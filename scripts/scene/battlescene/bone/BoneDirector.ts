import Bone from "./bone.js";
import BattleScene from "scene/battlescene/BattleScene";
import Director from "../director/Director.js";
import Keys from "../../../keys.js";
import stabBone from "./stabbone/stabBone.js";
import CircleBone from "./circlebone/circleBone.js";
import addGap from "./addGap.js";
import {
    BoneConfig,
    CircleBoneConfig,
    StabBoneConfig
} from "../../../Types.js";
import update from "./directorUpdate.js";
import addSine from "./addSine.js";
import addMulti from "../addMulti.js";
import router from "./router.js";
class BoneDirector extends Phaser.GameObjects.Group {
    constructor(scene: BattleScene, collision: number, OPERATOR: Director) {
        super(scene);
        this.collision = collision;
        this.director = OPERATOR;
        scene.add.existing(this);
        this.repeats = [];
        this.stabs = [];
        this.circles = [];

        this.stabBone = stabBone;
        this.CircleBone = CircleBone;
        this.addSine = addSine;
        this.addMulti = addMulti;
        this.addGap = addGap;

        this.router = router;
        this.update = update;
    }
    declare scene: BattleScene;
    readonly director: Director;
    readonly collision: number;
    repeats: Phaser.Time.TimerEvent[];
    stabs: stabBone[];
    circles: CircleBone[];
    readonly stabBone: typeof stabBone;
    readonly CircleBone: typeof CircleBone;
    readonly addSine: typeof addSine;
    readonly addMulti: typeof addMulti;
    readonly addGap: typeof addGap;
    readonly router: typeof router;
    readonly update: typeof update;
    addSingle(data: BoneConfig, type?: Bone["moveType"]): Bone {
        let result: Bone;
        result = new Bone(this.scene as BattleScene, data, this.collision, this.director, type);
        result.setDepth(Keys.Depth.bone);
        this.add(result);

        return result;
    }
    addCircle(config: CircleBoneConfig) {
        this.circles.push(new this.CircleBone(this.scene, config, this));
    }
    addStab(config: StabBoneConfig) {
        this.stabs.push(new this.stabBone(this.scene, config, this.director, this));
    }
    clear(removeFromScene?: boolean | undefined, destroyChild?: boolean | undefined): this {
        this.scene.tweens.killTweensOf(this.getChildren());
        super.clear(removeFromScene, destroyChild);
        for (const iterator of this.circles) {
            iterator.destroy();
        }
        for (const iterator of this.stabs) {
            iterator.destroy();
        }
        for (const iterator of this.repeats) {
            iterator.remove();
        }
        return this;
    }
}
export default BoneDirector;