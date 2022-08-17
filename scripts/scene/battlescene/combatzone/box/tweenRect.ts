import { TweenRectConfig } from "../../../../Types.js";
import CombatZone from "./combatzone.js";
import changeAndCheck from "../../setTween.js";
export default function tweenRect(this: CombatZone, config: TweenRectConfig) {

    if (config.tween) {
        this.moving = true;
        changeAndCheck(this.scene, this.RectSize, config.tween);
    } else {
        console.error(`tween is not defined at ${ this.director.AttackLoader.runAttackPos }`);
    }
}