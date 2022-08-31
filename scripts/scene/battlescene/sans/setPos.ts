import type { AllReadonly, SetPositionConfig } from "../../../Types.js";
import type Sans from "./Sans.js";
import checkType from "../checkType.js";
export default function setSansPosition(this: Sans, config: AllReadonly<SetPositionConfig>) {
    const DATA = checkType(config, {
        x: {
            type: ["number", "boolean"],
            default: false
        },
        y: {
            type: ["number", "string", "boolean"],
            default: false
        },
        ease: {
            type: "string",
            default: "Linear"
        },
        duration: {
            type: ["number", "boolean"],
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);

    if (DATA.duration) {
        if (typeof DATA.x === "number" && typeof DATA.y === "number") {
            this.yAuto = false;
            this.scene.tweens.add(
                {
                    targets: this,
                    props: {
                        x: DATA.x,
                        y: DATA.y
                    },
                    duration: DATA.duration,
                    ease: DATA.ease
                }
            );
        } else {
            if (typeof DATA.x === "number") {
                this.scene.tweens.add(
                    {
                        targets: this,
                        props: {
                            x: DATA.x,
                        },
                        duration: DATA.duration,
                        ease: DATA.ease
                    }
                );
            }
            if (DATA.y !== false) {
                if (DATA.y === "auto") {
                    this.yAuto = true;
                } else if (DATA.y === "lock") {
                    this.yAuto = false;
                } else {
                    this.yAuto = false;
                    this.scene.tweens.add(
                        {
                            targets: this,
                            props: {
                                y: DATA.y,
                            },
                            duration: DATA.duration,
                            ease: DATA.ease
                        }
                    );
                }
            }
        }

    } else {
        if (DATA.x !== false) {
            this.x = DATA.x;
        }
        if (DATA.y !== false) {
            if (DATA.y === "auto") {
                this.yAuto = true;
            } else if (DATA.y === "lock") {
                this.yAuto = false;
            } else {
                this.yAuto = false;
                this.y = DATA.y;
            }
        }
    }
}