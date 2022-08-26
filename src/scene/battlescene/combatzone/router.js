export default function router(config, type) {
    return this.Zones[config.zone || "main"].router(config, type);
}
//# sourceMappingURL=router.js.map