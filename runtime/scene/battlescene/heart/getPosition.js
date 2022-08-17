function getPosition(config) {
    if (config.x) {
        this.director.GameMath.variables[config.x] = this.Image.x;
    }
    if (config.y) {
        this.director.GameMath.variables[config.y] = this.Image.y;
    }
}
export default getPosition;
//# sourceMappingURL=getPosition.js.map