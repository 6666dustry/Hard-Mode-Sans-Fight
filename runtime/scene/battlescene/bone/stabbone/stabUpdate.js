function update(time) {
    if (this.Zone.moving && this.state === "warning") {
        this.warnBox.clear();
        this.setWarn();
    }
}
export default update;
//# sourceMappingURL=stabUpdate.js.map