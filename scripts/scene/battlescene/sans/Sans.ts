import type { SansType, SansConfig, FallingConfig, SansVisualConfig } from "../../../Types.js";
import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import Keys from "../../../keys.js";
import setVisual from "./setVisual.js";
import slamAnimMaker from "./slamAnims.js";
import update from "./update.js";
import setSansPosition from "./setPos.js";
import router from "../router.js";
import Base from "../director/Base.js";
//sans.
export default class Sans extends Base(Phaser.GameObjects.Container) {
    constructor(scene: BattleScene, x: number, y: number, director: Director) {
        super(scene, x, y);
        this.BaseConstructor(scene, director);
        this.torsoX = 0;
        this.torsoY = 0;

        this.legY = 47;

        this.headY = -43;

        this.animX = 0;
        this.animY = 0;
        this.animSpeed = 400;

        this.avoidWait = 1200;
        this.avoidSpeed = 400;

        this.slamming = false;
        this.yAuto = true;

        this.state = "dancing";
        this.director = director;

        this.leg = scene.add.sprite(0, this.legY, Keys.Sheet.sansLeg).setScale(2);

        this.torso = scene.add.sprite(this.torsoX, this.torsoY, Keys.Sheet.sansTorso).setScale(2);

        this.head = scene.add.sprite(0, this.headY, Keys.Sheet.sansHead).setScale(2);

        this.sweet = scene.add.sprite(0, this.headY - 20, Keys.Sheet.sansSweet).setScale(2).setVisible(false);

        this.add([this.leg, this.torso, this.head, this.sweet]);
        scene.add.existing(this);

        this.damageText = this.scene.add.text(320, y - 90, "miss", {
            fontFamily: "damagefont",
            fontSize: "100px",
            color: "#999"
        }).setScale(0.25).setVisible(false).setOrigin(0.5).setDepth(Keys.Depth.sans);

        this.setDepth(Keys.Depth.sans);
        this.setPos = setSansPosition;

        slamAnimMaker(scene);
        this.setVisual = setVisual;
        this.update = update;
    }
    readonly head: Phaser.GameObjects.Sprite;
    readonly headY: number;
    readonly torso: Phaser.GameObjects.Sprite;
    torsoY: number;
    torsoX: number;
    readonly leg: Phaser.GameObjects.Sprite;
    legY: number;
    readonly sweet: Phaser.GameObjects.Sprite;
    animX: number;
    animY: number;
    readonly animSpeed: number;
    readonly damageText: Phaser.GameObjects.Text;
    readonly avoidWait: number;
    readonly avoidSpeed: number;
    state: Exclude<NonNullable<SansVisualConfig["state"]>, boolean>;
    slamming: boolean;
    yAuto: boolean;
    falling?: FallingConfig["direction"];
    readonly setVisual: typeof setVisual;
    readonly setPos: typeof setSansPosition;
    avoid(): Phaser.Tweens.Tween {
        return this.scene.tweens.add({
            targets: this, delay: 0,
            props: {
                x: {
                    value: this.x - 100,
                    duration: this.avoidSpeed,
                    yoyo: true,
                    hold: this.avoidWait,
                },
            },
            hold: this.avoidWait,
            duration: this.avoidSpeed,
            ease: 'Sine.easeOut',
            onStart: this.showDamage,
            onStartScope: this
        });
    }
    /**
     * show "miss" text.
     */
    showDamage(): void {
        this.scene.time.addEvent({
            delay: this.avoidSpeed,
            repeat: 0,
            callback: () => {
                this.damageText.setVisible(true);
                this.damageText.setActive(true);
            },
            callbackScope: this
        });

        this.scene.time.addEvent({
            delay: this.avoidSpeed + this.avoidWait,
            repeat: 0,
            callback: () => {
                this.damageText.setVisible(false);
                this.damageText.setActive(false);
            },
            callbackScope: this
        });
    }
    router(config: SansConfig, type: SansType) {
        if (type === "setPosition") {
            type = "setPos";
        }
        router.call(this, config, type);
    }
}