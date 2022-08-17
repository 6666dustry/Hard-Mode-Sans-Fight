function setMode(state) {
    this.state = state ? "running" : "sleep";
    this.setActive(state);
    this.setVisible(state);
}
export default setMode;
//# sourceMappingURL=setMode.js.map