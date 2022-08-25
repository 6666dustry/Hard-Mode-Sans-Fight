import Bone from "./bone.js";
import Keys from "../../../keys.js";
import stabBone from "./stabbone/stabBone.js";
import CircleBone from "./circlebone/circleBone.js";
import addGap from "./addGap.js";
import update from "./directorUpdate.js";
import addSine from "./addSine.js";
import addMulti from "../addMulti.js";
import router from "./router.js";
export default class BoneDirector extends Phaser.GameObjects.Group {
    constructor(scene, collision, OPERATOR) {
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
    director;
    collision;
    repeats;
    stabs;
    circles;
    stabBone;
    CircleBone;
    addSine;
    addMulti;
    addGap;
    router;
    update;
    addSingle(data, type, ignoreWarn) {
        let result;
        result = new Bone(this.scene, data, this.collision, this.director, type, ignoreWarn);
        result.setDepth(Keys.Depth.bone);
        this.add(result);
        return result;
    }
    addCircle(config) {
        this.circles.push(new this.CircleBone(this.scene, config, this));
    }
    addStab(config) {
        this.stabs.push(new this.stabBone(this.scene, config, this.director, this));
    }
    clear(removeFromScene, destroyChild) {
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
//# sourceMappingURL=BoneDirector.js.map