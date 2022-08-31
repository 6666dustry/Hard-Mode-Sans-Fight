import type Heart from "./Heart.js";
import type { HeartConfig, HeartType, } from "../../../Types.js";
import routerCall from "../router.js";
export default function router(this: Heart, config: HeartConfig, type: HeartType): void {
    switch (type) {
        case "getPos":
            type = "getPosition";
            break;
        case "setPos":
            type = "setPosition";
            break;
        case "setG":
            type = "setGravity";
            break;
    }
    routerCall.call(this, config, type);
}