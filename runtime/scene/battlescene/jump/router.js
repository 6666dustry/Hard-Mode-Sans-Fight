import routerCall from "../router.js";
function router(config, type) {
    try {
        const IS_LOOP = this.director.AttackLoader.runAttackPos;
        let jumped;
        if (this[type]) {
            jumped = routerCall.call(this, config, type);
        }
        else {
            jumped = false;
            throw new Error(`type name is undefined ${type} `);
        }
        if (!jumped) {
            this.director.AttackLoader.runAttackPos++;
        }
        if (jumped && IS_LOOP === this.director.AttackLoader.runAttackPos) {
            throw new Error(`detected infinity loop at ${this.director.AttackLoader.runAttackPos} `);
        }
        return jumped;
    }
    catch (error) {
        console.error(error.message);
        this.director.AttackLoader.runAttackPos++;
        return true;
    }
}
export default router;
//# sourceMappingURL=router.js.map