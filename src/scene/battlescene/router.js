export default function router(config, type) {
    if (this[type] == null || typeof this[type] !== "function") {
        console.error(`type is name not defined at ${this.director.AttackLoader.runAttackPos}
        type ${type}`);
    }
    else
        return (this[type])(config);
}
;
//# sourceMappingURL=router.js.map