import setTween from "../../setTween.js";
import checkType from "../../checkType.js";
import makeDeepCopy from "../../makeDeepCopy.js";
export default function tweenRect(config) {
    const DATA = checkType(config, {
        zone: {
            type: "string",
            default: "main"
        },
        tween: "object",
    }, this.director.AttackLoader.runAttackPos);
    this.scene.tweens.killTweensOf(this.RectSize);
    if (DATA.tween) {
        this.moving = true;
        const TWEEN = makeDeepCopy(DATA.tween);
        setTween(this.scene, this.RectSize, TWEEN);
    }
    else {
        console.error(`tween is not defined at ${this.director.AttackLoader.runAttackPos}`);
    }
}
//# sourceMappingURL=tweenRect.js.map