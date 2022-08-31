import type Statuses from "./Statuses.js";
import type { HealConfig } from "../../../Types.js";
import Keys from "../../../keys.js";
/**
 * heal player hp.
 * @param this 
 * @param config single item.
 * @returns is hp maxed out? boolean.
 * 
 */
export default function healHp(this: Statuses, config: HealConfig): boolean {
    const AMOUNT: number = config.amount || this.maxHp / 2;

    this.hp += AMOUNT;
    this.scene.sound.play(Keys.Audio.heal);

    if (config.debug) {
        this.kr = 0;
    }

    if (this.hp > this.maxHp) {
        if (this.scene.config.settings && this.scene.config.settings.ignoreKr) {
            this.kr -= (this.hp - this.maxHp);
            if (this.kr < 0) {
                this.kr = 0;
            }
        }

        this.hp = this.maxHp;
        this.hpText.setText(`${ this.hp } / ${ this.maxHp }`);

        return true;
    } else {
        this.hpText.setText(`${ this.hp } / ${ this.maxHp }`);
        return false;
    }
}