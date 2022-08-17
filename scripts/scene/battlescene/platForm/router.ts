import type { PlatFormConfig, PlatFormType } from "../../../Types.js";
import PlatFormDirector from "./platformDirector.js";
import routerCall from "../router.js";
function router(this: PlatFormDirector, config: PlatFormConfig, type: PlatFormType) {
    routerCall.call(this, config, type);
}
export default router;