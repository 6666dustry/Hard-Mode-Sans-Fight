import type BoneDirector from "./BoneDirector.js";
import type { BonesConfig, BoneType, } from "../../../Types.js";
import routerCall from "../router.js";
export default function router(this: BoneDirector, config: BonesConfig, type: BoneType) {
    routerCall.call(this, config, type);
}