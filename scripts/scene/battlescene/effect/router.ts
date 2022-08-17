import Effect from "./Effect.js";
import { EffectConfig, EffectType } from "../../../Types.js";
import routerCall from "../router.js";
function router(this: Effect, config: EffectConfig, type: EffectType) {
    routerCall.call(this, config, type);
}
export default router;