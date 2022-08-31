import type { RNDJumpConfig } from "../../../Types.js";
import type Jumps from "./Jumps.js";
import checkType from "../checkType.js";
/**
 * randomly jump.
 * @param this 
 * @param config 
 * @returns 
 */

export default function RND(this: Jumps, config: RNDJumpConfig) {
    const DATA = checkType(config, {
        to: "object",
        rel: {
            type: "boolean",
            default: false
        }
    }, this.director.AttackLoader.runAttackPos);
    const KEY = Phaser.Math.Between(0, DATA.to.length - 1);

    let to = DATA.to[KEY];

    if (typeof to !== "number") {
        to = this.searchLabel(to);
    }

    if (DATA.rel) {
        this.director.AttackLoader.runAttackPos += to;
    }
    else {
        this.director.AttackLoader.runAttackPos = to;
    }
    return true;
}