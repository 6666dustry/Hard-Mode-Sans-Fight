import Keys from "../../../keys.js";
import AttackLoader from "./attackLoader.js";
import Practice from "./practice.js";
/**
 * start attack again. called at practice mode.
 * @param this 
 */
export default function retry(this: AttackLoader) {
    const D = this.director;
    D.removeAll();
    D.Heart.enemyTurnInit();
    D.CombatzoneDirector.setRectDefault(true);
    D.Sans.x = 320;
    for (const key in this.Loading) {
        if (Object.prototype.hasOwnProperty.call(this.Loading, key)) {
            let element = this.Loading[key as keyof typeof this.Loading];
            if (element) {
                element.remove();
            }
        }
    }

    Practice.showPassed(this.scene, false);

    this.runAttackPos = 0;
    this.startAttack();
}