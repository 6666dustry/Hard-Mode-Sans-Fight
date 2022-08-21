import Keys from "../../../keys.js";
function setSlam(config) {
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
            const SLAM_TO = this.director.CombatzoneDirector.getIn(this.Image.x, this.Image.y);
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
/**and sans slam. */
export default function setGravity(config) {
    if (config.slamAnim) {
        const CONFIG = {
            target: "torso",
            anim: typeof config.slamAnim === "string" ? config.slamAnim : config.slamAnim ? `${config.direction || "down"}Slam` : undefined,
            autoInit: config.autoInit
        };
        this.director.Sans.setVisual(CONFIG);
        this.scene.time.delayedCall(300, setSlam, [config], this);
    }
    else {
        setSlam.call(this, config);
    }
    if (config.color) {
        this.setColor({
            color: config.color
        });
    }
    if (config.playSound) {
        this.scene.sound.play(Keys.Audio.ding);
    }
    if (config.takeDamage) {
        if (this.director.Statuses.hp > 1) {
            this.director.Statuses.hp--;
            this.director.Statuses.setDisplay();
        }
        this.scene.sound.play(Keys.Audio.damage);
    }
}
//# sourceMappingURL=setGravity.js.map