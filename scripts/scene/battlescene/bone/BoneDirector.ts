import type BattleScene from "scene/battlescene/BattleScene";
import type Director from "../director/Director.js";
import type { BoneConfig, CircleBoneConfig, StabBoneConfig } from "../../../Types.js";
import Keys from "../../../keys.js";
import Bone from "./Bone.js";
import stabBone from "./stabbone/stabBone.js";
import CircleBone from "./circlebone/circleBone.js";
import addGap from "./addGap.js";
import update from "./directorUpdate.js";
import addSine from "./addSine.js";
import addMulti from "../addMulti.js";
import router from "./router.js";
import Base from "../director/Base.js";
export default class BoneDirector extends Base(Phaser.GameObjects.Group) {
    constructor(scene: BattleScene, collision: number, director: Director) {
        super(scene);
        this.BaseConstructor(scene, director);
        this.collision = collision;
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
    addSingle(data: BoneConfig, type?: Bone["moveType"], ignoreWarn?: {
        [k: string]: boolean;
    }): Bone {
        let result: Bone;
        result = new Bone(this.scene as BattleScene, data, this.collision, this.director, type, ignoreWarn);
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