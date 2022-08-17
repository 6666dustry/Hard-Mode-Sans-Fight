function getPadding() {
    if (this.padding === "equal") {
        if (this.count === "single") {
            return 0;
        }
        return 360 / this.count;
    }
    else {
        return this.padding;
    }
}
export default getPadding;
//# sourceMappingURL=convertEqual.js.map