export default function destroyStab() {
    for (const iterator of this.Bones) {
        iterator.removeAll(true);
        iterator.destroy();
    }
    if (this.warnBox) {
        this.warnBox.destroy();
    }
    this.destroy();
}
//# sourceMappingURL=destroyStab.js.map