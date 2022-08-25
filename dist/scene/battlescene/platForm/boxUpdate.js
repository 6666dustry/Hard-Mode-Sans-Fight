export default function update() {
    this.Middle.setScale(this.boxLength / this.Middle.width, 1);
    this.Left.setPosition(-(this.Middle.displayWidth / 2), 0);
    this.Right.setPosition((this.Middle.displayWidth / 2), 0);
}
//# sourceMappingURL=boxUpdate.js.map