import Debug from "./Debug.js";

function setMode(this: Debug, state: boolean) {
    this.state = state ? "running" : "sleep";

    this.setActive(state);
    this.setVisible(state);
}
export default setMode;