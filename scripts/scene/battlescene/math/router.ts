import type { GameMathConfig, GameMathType, } from "../../../Types.js";
import type GameMath from "./GameMath.js";
import routerCall from "../router.js";
export default function router(this: GameMath, config: GameMathConfig, type: GameMathType) {
    routerCall.call(this, config, type);
}