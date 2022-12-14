import type BoxNinePatch from "./BoxNinePatch.js";

export default function update(this: BoxNinePatch) {
    this.Middle.setScale(this.boxLength / this.Middle.width, 1);
    this.Left.setPosition(-(this.Middle.displayWidth / 2), 0);
    this.Right.setPosition((this.Middle.displayWidth / 2), 0);
}