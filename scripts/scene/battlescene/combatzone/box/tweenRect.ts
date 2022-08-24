import { AllReadonly, TweenRectConfig } from "../../../../Types.js";
import CombatZone from "./combatzone.js";
import setTween from "../../setTween.js";
import checkType from "../../checkType.js";
import makeDeepCopy from "../../makeDeepCopy.js";
export default function tweenRect(this: CombatZone, config: AllReadonly<TweenRectConfig>) {
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
        const TWEEN = makeDeepCopy<Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenBuilderConfig[]>(DATA.tween);
        setTween(this.scene, this.RectSize, TWEEN);
    } else {
        console.error(`tween is not defined at ${ this.director.AttackLoader.runAttackPos }`);
    }
}