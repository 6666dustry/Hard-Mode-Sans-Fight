function getColorKey() {
    switch (Math.floor(this.color) % 3) {
        case 0:
            return "white";
        case 1:
            return "blue";
        case 2:
            return "orange";
        default:
            return "white";
    }
}
export default getColorKey;
//# sourceMappingURL=getColorKey.js.map