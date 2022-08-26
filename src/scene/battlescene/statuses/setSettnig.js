export default function setSetting(config) {
    if (config.easyMode) {
        this.takeDamageSpeed = 4;
        this.takeKr = 2;
        this.HpBar.setTint(0x00ff00);
    }
    else {
        this.takeDamageSpeed = 2;
        this.takeKr = 4;
    }
    if (config.infHP) {
        this.noTakeDamage = true;
    }
    else {
        this.noTakeDamage = false;
    }
    if (config.phase2) {
        this.director.AttackLoader.phase = 2;
    }
}
//# sourceMappingURL=setSettnig.js.map