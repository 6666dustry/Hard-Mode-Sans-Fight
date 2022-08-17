function rndValues(config) {
    let index = Phaser.Math.Between(0, config.values.length - 1);
    this.variables[config.variable] = config.values[index];
}
export default rndValues;
//# sourceMappingURL=rndValues.js.map