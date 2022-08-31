import type Effect from "./Effect.js";
import type { EffectConfig, EffectType } from "../../../Types.js";
import routerCall from "../router.js";
export default function router(this: Effect, config: EffectConfig, type: EffectType) {
    routerCall.call(this, config, type);
}