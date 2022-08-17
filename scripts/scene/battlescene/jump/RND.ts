import { RNDJumpConfig } from "../../../Types.js";
import Jumps from "./Jumps.js";
/**
 * randomly jump.
 * @param this 
 * @param config 
 * @returns 
 */

function RND(this: Jumps, config: RNDJumpConfig) {
    const KEY = Phaser.Math.Between(0, config.to.length - 1);

    let to = config.to[KEY];

    if (typeof to !== "number") {
        to = this.searchLabel(to);
    }

    if (config.rel) {
        this.director.AttackLoader.runAttackPos += to;
    }
    else {
        this.director.AttackLoader.runAttackPos = to;
    }
    return true;
}
export default RND;