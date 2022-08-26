export default function setColor(color) {
    for (const iterator of this.tints) {
        if (iterator) {
            iterator.setTint && iterator.setTint(color);
        }
    }
}
//# sourceMappingURL=setColor.js.map