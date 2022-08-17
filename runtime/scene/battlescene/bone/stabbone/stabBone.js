import Keys from "../../../../keys.js";
import spawnStab from "./spawnStabBone.js";
import update from "./stabUpdate.js";
import destroyStab from "./destroyStab.js";
import setWarn from "./setWarn.js";
class stabBone extends Phaser.GameObjects.Zone {
    constructor(scene, config, DIRECTOR, BONE_DIRECTOR) {
        super(scene, 0, 0);
        scene.add.existing(this);
        this.director = DIRECTOR;
        this.BONE_DIRECTOR = BONE_DIRECTOR;
        this.Bones = [];
        this.state = "warning";
        this.scene.sound.play(Keys.Audio.warning);
        this.color = config.color || "white";
        this.direction = config.direction || "down";
        this.Zone = this.director.CombatzoneDirector.getZone(config.zone);
        this.length = config.length || 20;
        this.lifetime = config.lifetime || 750;
        this.wait = config.wait || 1000;
        this.setWarn = setWarn;
        this.spawnStab = spawnStab;
        this.destroyStab = destroyStab;
        this.update = update;
        this.warnBox = this.scene.add.graphics({ lineStyle: { color: 0xff0000 } });
        this.warnBox.setDepth(1);
        this.warnBox.clear();
        this.warnBox.setVisible(false);
        this.addTo = this.Zone[this.direction];
        this.setWarn();
        if (config.slam) {
            if (config.slam === true) {
                this.director.Heart.setGravity({
                    direction: this.direction,
                    slam: true,
                    autoInit: false,
                    slamAnim: `${this.direction}Slam`,
                    color: "blue"
                });
            }
            else {
                this.director.Heart.setGravity(config.slam);
            }
        }
        if (config.onlyWarn) {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.destroy, undefined, this);
        }
        else {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.spawnStab, [config], this);
        }
    }
    Zone;
    direction;
    length;
    wait;
    lifetime;
    color;
    warnBox;
    addTo;
    state;
    setWarn;
    spawnStab;
    destroyStab;
    director;
    BONE_DIRECTOR;
    timerEvent;
    Bones;
    destroy(fromScene) {
        if (this.warnBox) {
            this.warnBox.clear();
            this.warnBox.destroy();
        }
        if (this.timerEvent) {
            this.timerEvent.remove();
        }
        super.destroy(fromScene);
    }
}
export default stabBone;
//# sourceMappingURL=stabBone.js.map