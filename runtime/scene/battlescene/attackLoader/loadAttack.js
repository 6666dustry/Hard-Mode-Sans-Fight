/**
   * deliver data to another module.
   */
function loadAttack(attack) {
    let noData = false;
    if (!attack) {
        console.error(`attack is not defined at ${this.runAttackPos}`);
        this.endAttack({});
    }
    if (attack.category !== "endAttack" && attack.category !== "endattack") {
        if (!attack.data) {
            console.warn(`data is not defined at ${this.runAttackPos}`);
        }
        if (!attack.type) {
            console.warn(`type is not defined at ${this.runAttackPos}`);
        }
    }
    if (!noData) {
        const D = this.director;
        switch (attack.category) {
            case "combatzone":
            case "combatZone":
                D.CombatzoneDirector.router(attack.data, attack.type);
                break;
            case "heart":
                D.Heart.router(attack.data, attack.type);
                break;
            case "bone":
                D.BoneDirector.router(attack.data, attack.type);
                break;
            case "gasterblaster":
            case "blaster":
                D.BlasterDirector.router(attack.data, attack.type);
                break;
            case "sanstext":
                D.SansText.router(attack.data, attack.type);
                break;
            case "sans":
                D.Sans.router(attack.data, attack.type);
                break;
            case "jump":
                D.Jumps.router(attack.data, attack.type);
                break;
            case "math":
                D.GameMath.router(attack.data, attack.type);
                break;
            case "audio":
                D.AudioPlayer.router(attack.data, attack.type);
                break;
            case "platform":
                D.PlatFormDirector.router(attack.data, attack.type);
                break;
            case "effect":
                D.Effect.router(attack.data, attack.type);
                break;
            case "endAttack":
            case "endattack":
                this.endAttack(attack.data);
                break;
            default:
                console.warn(`category is not defined at ${this.runAttackPos} `);
                break;
        }
    }
    if (attack.category === "jump" || attack.category === "endAttack" || attack.category === "endattack") {
    }
    else {
        this.runAttackPos++;
    }
    if (attack.category !== "endAttack" &&
        attack.category !== "endattack" &&
        attack.category !== "sanstext") {
        if (attack.category === "jump" && attack.wait && attack.wait > 0) {
            this.Loading.startAttack = this.scene.time.delayedCall(attack.wait, () => {
                this.startAttack();
            });
        }
        else
            this.startAttack();
    }
}
export default loadAttack;
//# sourceMappingURL=loadAttack.js.map