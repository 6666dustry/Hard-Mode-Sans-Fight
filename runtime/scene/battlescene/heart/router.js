import routerCall from "../router.js";
function router(config, type) {
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
export default router;
//# sourceMappingURL=router.js.map