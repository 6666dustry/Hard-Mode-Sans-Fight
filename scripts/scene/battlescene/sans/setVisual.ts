import { AllReadonly, SansVisualConfig } from "../../../Types.js";
import Keys from "../../../keys.js";
import Sans from "./Sans.js";
import checkType from "../checkType.js";
export default function setVisual(this: Sans, Config: AllReadonly<SansVisualConfig>) {
    const DATA = checkType(Config, {
        target: {
            type: "string",
            default: "head"
        },
        frame: {
            type: "string",
            default: "a"
        },
        autoInit: {
            type: "boolean",
            default: false
        },
        state: {
            type: "string",
            default: "dancing"
        },
        anim: {
            type: "string",
            default: "any"
        },
        visible: {
            type: "boolean",
            default: true
        }
    }, this.director.AttackLoader.runAttackPos);
    let target: Phaser.GameObjects.Sprite = this[Config.target || "head"];

    if (!target) {
        target = this["head"];
        console.error(`${ Config.target } is not defined at ${ this.director.AttackLoader.runAttackPos }`);
    }

    if (Config.visible != null) {
        target.setVisible(Config.visible);
    }

    if (Config.anim && Config.target === "torso") {
        switch (Config.anim) {
            case "upSlam":
                this.torso.anims.playReverse(Keys.Anim.downSlam);
                break;

            case "downSlam":
                this.torso.anims.play(Keys.Anim.downSlam);
                break;

            case "leftSlam":
                this.torso.anims.play(Keys.Anim.leftSlam);
                break;

            case "rightSlam":
                this.torso.anims.playReverse(Keys.Anim.leftSlam);
                break;

            default:
                console.warn(`anim name is not defined at ${ this.director.AttackLoader.runAttackPos } turn with ${ Config.anim }`);
                break;
        }

        this.slamming = true;

        if (Config.autoInit ||
            Config.anim === "leftSlam") {
            this.torso.off("animationcomplete");
            this.torso.once("animationcomplete", () => {
                this.torso.setFrame("torso");
                this.slamming = false;
            }, this);

        } else {
            this.torso.off("animationcomplete");
            this.torso.once("animationcomplete", () => {
                this.slamming = false;
            }, this);
        }

    } else if (Config.anim && Config.target === "head") {

        switch (Config.anim) {
            case "flashEye":
                this.head.anims.play(Keys.Anim.flashEyes);
                break;

            default:
                console.warn(`anim error on ${ this.director.AttackLoader.runAttackPos } turn with ${ Config.anim }`);
                break;
        }

    } else {

        if (Config.target === "sweet" && Config.frame === "addSweet") {
            if (!target.visible) {
                target.setVisible(true);
            } else {
                let num: 1 | 2 | 3 = Number.parseInt(target.frame.name.slice(-1)) as 1 | 2 | 3;

                num <= 2 && num++;
                target.setFrame(`sweet${ num }`);
            }
        } else
            if (Config.frame) {
                target.anims.stop();
                target.setFrame(Config.frame);
            }
    }

    if (Config.state) {
        this.state = Config.state;
    }
}