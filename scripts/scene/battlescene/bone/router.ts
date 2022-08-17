import BoneDirector from "./BoneDirector.js";
import {
    BonesConfig,
    BoneType,
} from "../../../Types.js";
import routerCall from "../router.js";
function router(this: BoneDirector, config: BonesConfig, type: BoneType) {
    routerCall.call(this, config, type);
}
export default router;