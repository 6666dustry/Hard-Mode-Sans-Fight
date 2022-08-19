export default function setMode(state) {
    this.state = state ? "running" : "sleep";
    this.setActive(state);
    this.setVisible(state);
}
//# sourceMappingURL=setMode.js.map