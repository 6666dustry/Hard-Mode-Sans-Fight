import Keys from "../../../keys.js";
import { gameDebug } from "../../../main.js";
import Bullet from "../bullet/bullet.js";
import checkType from "../checkType.js";
import getAnchoredPos from "../getAnchoredPos.js";
import update from "./blasterUpdate.js";
export default class GasterBlaster extends Bullet {
    constructor(scene, Config, collision, director) {
        super(scene, director, Config.color);
        scene.sound.play(Keys.Audio.blaster);
        scene.add.existing(this);
        this.director = director;
        const DATA = checkType(Config, {
            startX: {
                type: "number",
                default: 0
            },
            startY: {
                type: "number",
                default: 0
            },
            endX: {
                type: "number",
                default: 0
            },
            endY: {
                type: "number",
                default: 0
            },
            startAngle: {
                type: "number",
                default: 0
            },
            endAngle: {
                type: "number",
                default: 0
            },
            size: {
                type: "number",
                default: this.scene.textures.get(Keys.Sheet.blaster).get(0).height
            },
            wait: {
                type: "number",
                default: 500
            },
            blastTime: {
                type: "number",
                default: 500
            },
            color: {
                type: ["number", "string"],
                default: 0
            },
            anchor: {
                type: "object",
                default: {
                    x: "bottom",
                    y: "bottom"
                }
            }
        }, this.director.AttackLoader.runAttackPos);
        this.startX = DATA.startX;
        this.startY = DATA.startY;
        this.endX = DATA.endX;
        this.endY = DATA.endY;
        this.wait = DATA.wait;
        this.blastTime = DATA.blastTime;
        this.endAngle = DATA.endAngle;
        this.endAngle %= 360;
        this.startAngle = DATA.startAngle;
        this.startAngle %= 360;
        this.anchor = DATA.anchor;
        this.collision = collision;
        this.Face = scene.add.sprite(0, 0, Keys.Sheet.blaster);
        this.size = DATA.size;
        this.Laser = this.scene.add.sprite(16, 0, Keys.Image.block);
        const LASER_SCALE = this.size / this.Laser.width;
        this.Laser.setScale(100, LASER_SCALE);
        const FACE_SCALE = this.size / this.Face.width;
        const MORE = 2.5;
        const MIN = 2;
        this.Face.setScale(Math.max(MIN, FACE_SCALE * MORE), FACE_SCALE * MORE);
        this.Laser.setVisible(false);
        this.add([this.Laser,
        ]);
        this.Arc = scene.add.arc(-(this.Laser.displayWidth / 2) + this.Laser.x, 0, this.Laser.displayHeight / 2, 90, 270, false, 0xffffff);
        this.Arc.setTint = this.Arc.setFillStyle;
        this.add(this.Arc);
        this.Arc.setVisible(false);
        this.setAngle(this.startAngle);
        this.setSize(this.Laser.displayWidth, this.Laser.displayHeight - 10);
        const MatterObject = this.scene.matter.add.gameObject(this);
        MatterObject.setIgnoreGravity(true);
        MatterObject.setCollidesWith(0);
        MatterObject.setCollisionCategory(this.collision);
        MatterObject.setFrictionAir(0);
        MatterObject.setMass(Keys.MASS);
        // set start position.
        let startPos = {
            x: DATA.startX,
            y: DATA.startY,
            width: this.Face.displayWidth,
            height: this.Face.displayHeight,
            angle: DATA.startAngle,
            anchor: this.anchor
        };
        getAnchoredPos(startPos);
        this.Face.setPosition(startPos.x, startPos.y);
        this.Face.setDepth(Keys.Depth.blaster);
        let add = Phaser.Math.Rotate({
            x: this.Face.displayWidth,
            y: 0
        }, Phaser.Math.DegToRad(Config.endAngle || 0));
        // set end point.
        let endFacePos = {
            x: DATA.endX - add.x,
            y: DATA.endY - add.y,
            width: this.Face.displayWidth * 2,
            height: this.Laser.displayHeight,
            angle: DATA.endAngle || 0,
            anchor: this.anchor,
            origin: {
                width: this.Face.displayWidth,
            }
        };
        getAnchoredPos(endFacePos);
        let endPoint = {
            x: DATA.endX,
            y: DATA.endY,
            width: this.width + this.Face.displayWidth,
            height: this.Laser.displayHeight,
            angle: DATA.endAngle,
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
        this.colorKey = DATA.color;
    }
    collision;
    Face;
    Laser;
    Arc;
    stopped;
    state;
    startX;
    startY;
    endX;
    endY;
    size;
    wait;
    blastTime;
    startAngle;
    endAngle;
    propTime;
    anchor;
    laserTween;
    haveDamage;
    debuGraphic;
    blastWait() {
        if (this.scene === undefined) {
            return;
        }
        this.Face.setPosition(-(this.Laser.displayWidth / 2) - (this.Face.displayWidth / 2), 0);
        this.Face.setAngle();
        this.add(this.Face);
        this.bringToTop(this.Face);
        let delay = this.wait - this.propTime;
        if (this.wait <= 0) {
            this.faceOpen();
        }
        else {
            this.state = "readyBlast";
            this.scene.time.delayedCall(delay, this.faceOpen, undefined, this);
        }
    }
    faceOpen() {
        if (this.scene === undefined) {
            return;
        }
        const WAIT_BLAST = 200;
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
        this.scene.matter.applyForceFromAngle(this.body, -Keys.MASS / 30);
        this.scene.time.delayedCall(this.blastTime, this.endBlast, undefined, this);
    }
    stopMove() {
        this.scene.matter.setVelocity(this.body, 0, 0);
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
    destroy(fromScene) {
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
    update(time, delta) {
        update.call(this, time, delta);
        if (this.haveDamage) {
            super.update();
        }
    }
}
//# sourceMappingURL=GasterBlaster.js.map