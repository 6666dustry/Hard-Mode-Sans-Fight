import Keys from "../../../keys.js";
import AttackLoader from "./attackLoader.js";
/**
 * start attack again. called at practice mode.
 * @param this 
 */
export default function retry(this: AttackLoader) {
    const D = this.director;
    D.removeAll();
    D.Heart.enemyTurnInit();
    D.CombatzoneDirector.setRectDefault(true);

    for (const key in this.Loading) {
        if (Object.prototype.hasOwnProperty.call(this.Loading, key)) {
            let element = this.Loading[key as keyof typeof this.Loading];
            if (element) {
                element.remove();
            }
        }
    }

    let text = this.scene.add.text(
        320, 50, "failure", {
        fontFamily: "damageFont",
        color: "#c00",
        fontSize: "32px"
    }
    );

    text.setOrigin(0.5);
    text.setDepth(Keys.Depth.debug);
    this.scene.time.delayedCall(1000, () => {
        if (text && text.scene) {
            text.destroy();
        }
    });

    this.runAttackPos = 0;
    this.startAttack();
}