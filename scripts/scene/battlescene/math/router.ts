import {
    GameMathConfig,
    GameMathType,
} from "../../../Types.js";
import GameMath from "./GameMath.js";
import routerCall from "../router.js";

function router(this: GameMath, config: GameMathConfig, type: GameMathType) {
    routerCall.call(this, config, type);
}
export default router;