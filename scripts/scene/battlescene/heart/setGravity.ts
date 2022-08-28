import Heart from "./Heart.js";
import { HeartGravity } from "../../../Types.js";
import Keys from "../../../keys.js";
import { SansVisualConfig } from "../../../Types.js";
import checkType from "../checkType.js";
function setSlam(this: Heart, config: Required<HeartGravity>) {
    if (config.direction) {
        this.gravityDirection = config.direction;
    }

    if (config.slam) {
        const PADDING = this.Image.displayWidth / 2;
        const DURATION = 50;
        this.slamming = true;
        this.setDirection();
        const ONCOMPLETE = () => {
            this.Force = { x: 0, y: 0 };
            this.Image.setVelocity(0);
        };
        this.scene.cameras.main.shake(100, 0.01);

        if (this.Image.body) {

            const SLAM_TO = this.director.CombatzoneDirector.Zones.main;
            if (SLAM_TO) {
                switch (config.direction || this.gravityDirection) {
                    case "up":
                        this.scene.tweens.add({
                            targets: this.Image,
                            props: {
                                y: SLAM_TO.boxY + PADDING
                            },
                            onComplete: ONCOMPLETE,
                            onCompleteScope: this,
                            duration: DURATION
                        });
                        break;
                    case "down":
                        this.scene.tweens.add({
                            targets: this.Image,
                            props: {
                                y: SLAM_TO.boxDy - PADDING
                            },
                            onComplete: ONCOMPLETE,
                            onCompleteScope: this,
                            duration: DURATION
                        });
                        break;
                    case "right":
                        this.scene.tweens.add({
                            targets: this.Image,
                            props: {
                                x: SLAM_TO.boxDx - PADDING
                            },
                            onComplete: ONCOMPLETE,
                            onCompleteScope: this,
                            duration: DURATION
                        });
                        break;
                    case "left":
                        this.scene.tweens.add({
                            targets: this.Image,
                            props: {
                                x: SLAM_TO.boxX + PADDING
                            },
                            onComplete: ONCOMPLETE,
                            onCompleteScope: this,
                            duration: DURATION
                        });
                        break;
                }
                this.scene.sound.play(Keys.Audio.slam);
            }
        }
    }
}


export default function setGravity(this: Heart, config: HeartGravity) {
    const DATA = checkType(config, {
        direction: {
            type: ["string", "boolean"],
            default: false
        },
        slam: {
            type: "boolean",
            default: false
        },
        slamAnim: {
            type: ["boolean", "string"],
            default: false
        },
        color: {
            type: ["string", "boolean"],
            default: false
        },
        autoInit: {
            type: "boolean",
            default: false
        },
        playSound: {
            type: "boolean",
            default: false
        },
        takeDamage: {
            type: "boolean",
            default: false
        },
    }, this.director.AttackLoader.runAttackPos);
    if (DATA.slamAnim) {
        const CONFIG: SansVisualConfig = {
            target: "torso",
            anim: typeof DATA.slamAnim === "string" ? DATA.slamAnim : DATA.slamAnim ? `${ DATA.direction || "down" }Slam` : undefined,
            autoInit: DATA.autoInit
        };
        this.director.Sans.setVisual(CONFIG);

        this.scene.time.delayedCall(300, setSlam, [DATA], this);
    } else {
        setSlam.call(this, DATA);
    }
    if (DATA.color) {
        this.setColor({
            color: DATA.color
        }
        );
    }
    if (DATA.playSound) {
        this.scene.sound.play(Keys.Audio.ding);
    }
    if (DATA.takeDamage) {
        if (this.director.Statuses.hp > 1) {
            this.director.Statuses.hp--;
            this.director.Statuses.setDisplay();
        }
        this.scene.sound.play(Keys.Audio.damage);
    }
}
