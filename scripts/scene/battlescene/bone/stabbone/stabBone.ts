import BattleScene from "../../BattleScene.js";
import { StabBoneConfig, bulletColor, SetRectConfig } from "../../../../Types.js";
import Keys from "../../../../keys.js";
import Director from "../../director/Director.js";
import BoneDirector from "../BoneDirector.js";
import Bone from "../bone.js";
import spawnStab from "./spawnStabBone.js";
import update from "./stabUpdate.js";
import destroyStab from "./destroyStab.js";
import setWarn from "./setWarn.js";
import CombatZone from "../../combatzone/box/combatzone.js";
class stabBone extends Phaser.GameObjects.Zone {
    constructor(scene: BattleScene, config: StabBoneConfig, DIRECTOR: Director, BONE_DIRECTOR: BoneDirector) {
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
                this.director.Heart.setGravity(
                    {
                        direction: this.direction,
                        slam: true,
                        autoInit: false,
                        slamAnim: `${ this.direction }Slam`,
                        color: "blue"
                    }
                );
            } else {
                this.director.Heart.setGravity(config.slam);
            }
        }
        if (config.onlyWarn) {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.destroy, undefined, this);
        } else {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.spawnStab, [config], this);
        }
    }
    readonly Zone: CombatZone;
    readonly direction: StabBoneConfig["direction"];
    readonly length: number;
    readonly wait: number;
    readonly lifetime: number;
    readonly color: NonNullable<bulletColor>;
    readonly warnBox: Phaser.GameObjects.Graphics;
    readonly addTo: Phaser.Physics.Matter.Sprite;
    state: "warning" | "stabbing";
    readonly setWarn: typeof setWarn;
    readonly spawnStab: typeof spawnStab;
    readonly destroyStab: typeof destroyStab;
    readonly director: Director;
    readonly BONE_DIRECTOR: BoneDirector;
    readonly timerEvent: Phaser.Time.TimerEvent;
    Bones: Bone[];
    destroy(fromScene?: boolean) {
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

