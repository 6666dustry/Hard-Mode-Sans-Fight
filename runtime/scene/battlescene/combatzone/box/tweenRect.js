import changeAndCheck from "../../setTween.js";
export default function tweenRect(config) {
    if (config.tween) {
        this.moving = true;
        changeAndCheck(this.scene, this.RectSize, config.tween);
    }
    else {
        console.error(`tween is not defined at ${this.director.AttackLoader.runAttackPos}`);
    }
}
//# sourceMappingURL=tweenRect.js.map