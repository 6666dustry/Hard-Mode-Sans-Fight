import {
    JumpsConfig,
    JumpsType,
} from "../../../Types.js";
import Jumps from "./Jumps.js";
import routerCall from "../router.js";

function router(this: Jumps, config: JumpsConfig, type: JumpsType) {
    try {
        const IS_LOOP: number = this.director.AttackLoader.runAttackPos;
        let jumped: boolean;
        if (this[type]) {
            jumped = routerCall.call(this, config, type);
        } else {
            jumped = false;
            throw new Error(`type name is undefined ${ type } `);
        }
        if (!jumped) {
            this.director.AttackLoader.runAttackPos++;
        }
        if (jumped && IS_LOOP === this.director.AttackLoader.runAttackPos) {
            throw new Error(`detected infinity loop at ${ this.director.AttackLoader.runAttackPos } `);
        }
        return jumped;
    } catch (error) {

        console.error((error as Error).message);
        this.director.AttackLoader.runAttackPos++;
        return true;
    }
}
export default router;