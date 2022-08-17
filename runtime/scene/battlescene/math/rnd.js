function rnd(config) {
    const P = config.padding || 0;
    const MIN = config.min || 0;
    if (config.max - MIN <= P * 2) {
        console.error(`padding is too bigger at ${this.scene.director.AttackLoader.runAttackPos}`);
    }
    if (config.integer) {
        this.variables[config.variable] = Phaser.Math.Between(MIN + P, config.max - P);
    }
    else {
        this.variables[config.variable] = Phaser.Math.FloatBetween(MIN + P, config.max - P);
    }
}
export default rnd;
//# sourceMappingURL=rnd.js.map