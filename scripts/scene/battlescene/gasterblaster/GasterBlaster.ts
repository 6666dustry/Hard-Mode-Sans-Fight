import BattleScene from "scene/battlescene/BattleScene.js";
import Keys from "../../../keys.js";
import { gameDebug } from "../../../main.js";
import type { AnchorConfig, BlasterConfig, Anchor, bulletColor } from "../../../Types.js";
import Bullet from "../bullet/bullet.js";
import getColorKey from "../bullet/getColorKey.js";
import setColorKey from "../bullet/setColorKey.js";
import Director from "../director/Director.js";
import getAnchoredPos from "../getAnchoredPos.js";
import update from "./blasterUpdate.js";
class GasterBlaster extends Bullet {
    constructor(scene: BattleScene, Config: Readonly<BlasterConfig>, collision: number, director: Director) {

        super(scene,
            director,
            Config.color);

        scene.sound.play(Keys.Audio.blaster);

        scene.add.existing(this);

        this.director = director;

        this.startX = Config.startX || 0;
        this.startY = Config.startY || 0;


        this.endX = Config.endX;
        this.endY = Config.endY;


        this.wait = Config.wait || 500;
        this.blastTime = Config.blastTime || 500;

        this.endAngle = Config.endAngle || 0;
        this.endAngle %= 360;

        this.startAngle = Config.startAngle || this.endAngle + 180;
        this.startAngle %= 360;

        if (Config.anchor) {
            this.anchor = Config.anchor;
        } else {
            this.anchor = {
                x: "bottom",
                y: "bottom"
            };
        }
        this.collision = collision;

        this.Face = scene.add.sprite(0, 0, Keys.Sheet.blaster);

        this.size = Config.size || this.Face.width;

        this.Laser = this.scene.add.sprite(16, 0, Keys.Image.block);

        const LASER_SCALE = this.size / this.Laser.width;

        this.Laser.setScale(100, LASER_SCALE);

        const FACE_SCALE = this.size / this.Face.width;
        const MORE = 2.5;
        const MIN = 2;

        this.Face.setScale(Math.max(MIN, FACE_SCALE * MORE), FACE_SCALE * MORE
        );

        this.Laser.setVisible(false);


        this.add([this.Laser,
        ]);

        this.Arc = scene.add.arc(
            -(this.Laser.displayWidth / 2) + this.Laser.x,
            0, this.Laser.displayHeight / 2, 90, 270, false, 0xffffff) as typeof this.Arc;

        this.Arc.setTint = this.Arc.setFillStyle;



        this.add(this.Arc);
        this.Arc.setVisible(false);

        this.setAngle(this.startAngle);


        this.setSize(this.Laser.displayWidth, this.Laser.displayHeight - 10);

        const MatterObject: Phaser.Physics.Matter.Sprite = this.scene.matter.add.gameObject(this) as Phaser.Physics.Matter.Sprite;

        MatterObject.setIgnoreGravity(true);
        MatterObject.setCollidesWith(0);
        MatterObject.setCollisionCategory(this.collision);
        MatterObject.setFrictionAir(0);
        MatterObject.setMass(Keys.MASS);


        // set start position.
        let startPos: AnchorConfig = {
            x: Config.startX || 0,
            y: Config.startY || 0,
            width: this.Face.displayWidth,
            height: this.Face.displayHeight,
            angle: Config.startAngle || 0,
            anchor: this.anchor
        };
        getAnchoredPos(startPos);

        this.Face.setPosition(startPos.x, startPos.y);
        this.Face.setDepth(Keys.Depth.blaster);

        let add = Phaser.Math.Rotate({
            x: this.Face.displayWidth,
            y: 0
        },
            Phaser.Math.DegToRad(Config.endAngle || 0));
        // set end point.
        let endFacePos: AnchorConfig = {
            x: Config.endX - add.x,
            y: Config.endY - add.y,
            width: this.Face.displayWidth * 2,
            height: this.Laser.displayHeight,
            angle: Config.endAngle || 0,
            anchor: this.anchor,
            origin: {
                width: this.Face.displayWidth,
            }
        };

        getAnchoredPos(endFacePos);



        let endPoint: AnchorConfig = {
            x: Config.endX,
            y: Config.endY,
            width: this.width + this.Face.displayWidth,
            height: this.Laser.displayHeight,

            angle: Config.endAngle || 0,
            anchor: this.anchor,
            origin: {
                width: this.Face.displayWidth,
            }
        };

        getAnchoredPos(endPoint);

        this.setPosition(endPoint.x, endPoint.y);
        this.setAngle(endPoint.angle);


        this.propTime = Math.min(this.wait, 700);

        scene.tweens.add({
            targets: this.Face,
            delay: 0,
            props: {
                x: {
                    value: endFacePos.x,
                    duration: this.propTime
                },
                y: {
                    value: endFacePos.y,
                    duration: this.propTime
                },
                angle: {
                    value: endFacePos.angle,
                    duration: this.propTime
                }
            },
            duration: this.propTime,
            ease: 'Sine.easeOut',
            onComplete: this.blastWait,
            callbackScope: this
        });

        if (gameDebug) {
            this.debuGraphic = scene.add.graphics({
                fillStyle: {
                    color: 0x00ff00
                }
            }).setDepth(Keys.Depth.debug);
            this.debuGraphic.fillCircle(Config.endX || 0, Config.endY || 0, 5);
        }

        this.setDepth(Keys.Depth.blaster);

        this.stopped = false;
        this.haveDamage = false;
        this.state = "moving";
        this.tints = [this.Face, this.Laser, this.Arc];
        this.colorKey = Config.color || "white";
    }
    readonly collision: number;
    readonly Face: Phaser.GameObjects.Sprite;
    readonly Laser: Phaser.GameObjects.Sprite;
    readonly Arc: Phaser.GameObjects.Arc & {
        setTint: Phaser.GameObjects.Arc["setFillStyle"];
    };
    stopped: boolean;
    state: "moving" | "readyBlast" | "blasting" | "endBlast";
    readonly startX: number;
    readonly startY: number;
    readonly endX: number;
    readonly endY: number;
    readonly size: number;
    readonly wait: number;
    readonly blastTime: number;
    readonly startAngle: number;
    readonly endAngle: number;
    readonly propTime: number;
    readonly anchor: Anchor;
    laserTween!: Phaser.Tweens.Tween;
    haveDamage: boolean;
    debuGraphic!: Phaser.GameObjects.Graphics;
    blastWait() {

        if (this.scene === undefined) {
            return;
        }

        this.Face.setPosition(-(this.Laser.displayWidth / 2) - (this.Face.displayWidth / 2), 0);
        this.Face.setAngle();

        this.add(this.Face);
        this.bringToTop(this.Face);

        let delay: number = this.wait - this.propTime;

        if (this.wait <= 0) {
            this.faceOpen();
        } else {
            this.state = "readyBlast";
            this.scene.time.delayedCall(delay, this.faceOpen, undefined, this);
        }
    }
    faceOpen() {
        if (this.scene === undefined) {
            return;
        }

        const WAIT_BLAST: number = 200;

        this.Face.anims.play(Keys.Anim.blastStart, true);


        this.Laser.setVisible(true);
        this.Arc.setVisible(true);

        this.scene.tweens.add({
            targets: [this.Laser, this.Arc],
            props: {
                alpha: {
                    value: 1,
                    duration: WAIT_BLAST / 2
                },
                displayHeight: {
                    value: this.Laser.displayHeight,
                }
            },
            duration: WAIT_BLAST,
            onComplete: this.blasting,
            onCompleteScope: this
        });

        this.Laser.displayHeight = 0;
        this.Arc.displayHeight = 0;
        this.Laser.alpha = 0;
        this.Arc.alpha = 0;
    }
    blasting() {
        if (this.scene === undefined) {
            return;
        }
        this.state = "blasting";
        this.haveDamage = true;

        this.scene.sound.play(Keys.Audio.blast1, {
            volume: 0.5
        });
        this.scene.sound.play(Keys.Audio.blast0);

        this.scene.cameras.main.shake(100, 0.005);

        this.Face.anims.play(Keys.Anim.blasting, true);

        this.Laser.displayHeight = this.size - 10;
        this.Arc.displayHeight = this.size - 10;

        this.laserTween = this.scene.tweens.add({
            targets: [this.Laser, this.Arc],
            props: {
                displayHeight: Math.min(this.size + 20, this.Laser.displayHeight * 2),
            },

            yoyo: true,
            ease: Phaser.Math.Easing.Linear,
            duration: 150,
            repeat: -1,
        });

        this.scene.matter.applyForceFromAngle(this.body as MatterJS.BodyType, -Keys.MASS / 30);

        this.scene.time.delayedCall(this.blastTime, this.endBlast, undefined, this);
    }
    stopMove() {
        this.scene.matter.setVelocity(this.body as MatterJS.BodyType, 0, 0);
        this.stopped = true;
    }
    endBlast() {
        if (this.scene === undefined) {
            return;
        }

        this.haveDamage = false;
        this.laserTween.stop();
        this.scene.tweens.add({
            targets: [this.Laser, this.Arc],
            props: {
                alpha: {
                    value: 0,
                    duration: 350
                },
                displayHeight: {
                    value: 10,
                    duration: 300
                }
            },
            onComplete: () => {
                this.Arc.setVisible(false);
                this.state = "endBlast";
            },
            onCompleteScope: this
        });
    }
    destroy(fromScene?: boolean | undefined): void {
        if (this.scene) {
            if (this.state === "moving" && !fromScene) {
                this.Face.destroy();
            }
            if (this.debuGraphic) {
                this.debuGraphic.destroy(fromScene);
            }
            super.destroy(fromScene);
        }
    }
    update(time: number, delta: number) {
        update.call(this, time, delta);
        if (this.haveDamage) {
            super.update();
        }
    }
}
export default GasterBlaster;