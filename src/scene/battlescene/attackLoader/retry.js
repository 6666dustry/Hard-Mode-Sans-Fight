import Practice from "./practice.js";
/**
 * start attack again. called at practice mode.
 * @param this
 */
export default function retry() {
    const D = this.director;
    D.removeAll();
    D.Heart.enemyTurnInit();
    D.CombatzoneDirector.setRectDefault(true);
    D.Sans.x = 320;
    for (const key in this.Loading) {
        if (Object.prototype.hasOwnProperty.call(this.Loading, key)) {
            let element = this.Loading[key];
            if (element) {
                element.remove();
            }
        }
    }
    Practice.showPassed(this.scene, false);
    this.runAttackPos = 0;
    this.startAttack();
}
//# sourceMappingURL=retry.js.map