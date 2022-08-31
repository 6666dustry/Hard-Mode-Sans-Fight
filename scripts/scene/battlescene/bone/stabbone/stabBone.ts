import type BattleScene from "../../BattleScene.js";
import type { StabBoneConfig, bulletColor, AllReadonly } from "../../../../Types.js";
import type CombatZone from "../../combatzone/box/combatzone.js";
import type Director from "../../director/Director.js";
import type BoneDirector from "../BoneDirector.js";
import type Bone from "../Bone.js";
import Keys from "../../../../keys.js";
import spawnStab from "./spawnStabBone.js";
import update from "./stabUpdate.js";
import destroyStab from "./destroyStab.js";
import setWarn from "./setWarn.js";
import checkType from "../../checkType.js";
export default class stabBone extends Phaser.GameObjects.Zone {
    constructor(scene: BattleScene, config: AllReadonly<StabBoneConfig>, director: Director, boneDirector: BoneDirector) {
        super(scene, 0, 0);
        scene.add.existing(this);
        const DATA = checkType(config,
            {
                zone: {
                    type: "string",
                    default: "main"
                },
                direction: {
                    type: "string",
                    default: "down"
                },
                length: {
                    type: "number",
                    default: 20
                },
                wait: {
                    type: "number",
                    default: 1000
                },
                lifetime: {
                    type: "number",
                    default: 750
                },
                slam: {
                    type: ["string", "boolean"],
                    default: false
                },
                color: {
                    type: ["number", "string"],
                    default: 0
                },
                onlyWarn: {
                    type: "boolean",
                    default: false
                }
            }, director.AttackLoader.runAttackPos);

        this.director = director;
        this.BONE_DIRECTOR = boneDirector;
        this.Bones = [];
        this.state = "warning";
        this.scene.sound.play(Keys.Audio.warning);

        this.color = DATA.color;
        this.direction = DATA.direction;
        this.Zone = this.director.CombatzoneDirector.getZone(DATA.zone);
        this.length = DATA.length;
        this.lifetime = DATA.lifetime;
        this.wait = DATA.wait;


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

        if (DATA.slam) {
            if (DATA.slam === true) {
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
                this.director.Heart.setGravity(DATA.slam);
            }
        }

        if (DATA.onlyWarn) {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.destroy, undefined, this);
        } else {
            this.timerEvent = this.scene.time.delayedCall(this.wait, this.spawnStab, undefined, this);
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