import Keys from "../../../keys.js";
export default function setVisual(Config) {
    let target = this[Config.target || "head"];
    if (!target) {
        target = this["head"];
        console.error(`${Config.target} is not defined at ${this.director.AttackLoader.runAttackPos}`);
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
                console.warn(`anim name is not defined at ${this.director.AttackLoader.runAttackPos} turn with ${Config.anim}`);
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
        }
        else {
            this.torso.off("animationcomplete");
            this.torso.once("animationcomplete", () => {
                this.slamming = false;
            }, this);
        }
    }
    else if (Config.anim && Config.target === "head") {
        switch (Config.anim) {
            case "flashEye":
                this.head.anims.play(Keys.Anim.flashEyes);
                break;
            default:
                console.warn(`anim error on ${this.director.AttackLoader.runAttackPos} turn with ${Config.anim}`);
                break;
        }
    }
    else {
        if (Config.target === "sweet" && Config.frame === "addSweet") {
            if (!target.visible) {
                target.setVisible(true);
            }
            else {
                let num = Number.parseInt(target.frame.name.slice(-1));
                num <= 2 && num++;
                target.setFrame(`sweet${num}`);
            }
        }
        else if (Config.frame) {
            target.anims.stop();
            target.setFrame(Config.frame);
        }
    }
    if (Config.state) {
        this.state = Config.state;
    }
}
//# sourceMappingURL=setVisual.js.map