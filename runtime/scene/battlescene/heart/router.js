import routerCall from "../router.js";
export default function router(config, type) {
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
//# sourceMappingURL=router.js.map