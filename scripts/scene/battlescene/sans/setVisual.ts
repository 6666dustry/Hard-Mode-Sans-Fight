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
            type: ["string", "boolean"],
            default: false
        },
        autoInit: {
            type: "boolean",
            default: false
        },
        state: {
            type: ["string", "boolean"],
            default: false
        },
        anim: {
            type: ["string", "boolean"],
            default: false
        },
        visible: {
            type: "boolean",
            default: true
        }
    }, this.director.AttackLoader.runAttackPos);

    let target: Phaser.GameObjects.Sprite = this[DATA.target];


    target.setVisible(DATA.visible);


    if (DATA.anim && DATA.target === "torso") {
        switch (DATA.anim) {
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
                console.warn(`anim name is not defined at ${ this.director.AttackLoader.runAttackPos } turn with ${ DATA.anim }`);
                break;
        }

        this.slamming = true;

        if (DATA.autoInit ||
            DATA.anim === "leftSlam") {
            this.torso.off("animationcomplete");
            this.torso.once("animationcomplete", () => {
                this.torso.setFrame("torso");
                this.slamming = false;
                this.head.setPosition(0, this.headY);
                this.torso.setPosition(0, 0);
            }, this);

        } else {
            this.torso.off("animationcomplete");
            this.torso.once("animationcomplete", () => {
                this.slamming = false;
            }, this);
        }

    } else if (DATA.anim && DATA.target === "head") {

        switch (DATA.anim) {
            case "flashEye":
                this.head.anims.play(Keys.Anim.flashEyes);
                break;

            default:
                console.warn(`anim error on ${ this.director.AttackLoader.runAttackPos } turn with ${ DATA.anim }`);
                break;
        }

    } else {

        if (DATA.target === "sweet" && DATA.frame === "addSweet") {
            if (!target.visible) {
                target.setVisible(true);
            } else {
                let num: 1 | 2 | 3 = Number.parseInt(target.frame.name.slice(-1)) as 1 | 2 | 3;

                num <= 2 && num++;
                target.setFrame(`sweet${ num }`);
            }
        } else
            if (DATA.frame) {
                target.anims.stop();
                target.setFrame(DATA.frame);
            }
    }

    if (DATA.state) {
        this.state = DATA.state;
    }
}