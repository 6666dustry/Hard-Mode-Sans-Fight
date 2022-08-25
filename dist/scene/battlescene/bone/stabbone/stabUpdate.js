export default function update(time) {
    if (this.Zone.moving && this.state === "warning") {
        this.warnBox.clear();
        this.setWarn();
    }
}
//# sourceMappingURL=stabUpdate.js.map