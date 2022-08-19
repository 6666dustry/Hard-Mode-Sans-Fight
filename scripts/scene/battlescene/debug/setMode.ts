import Debug from "./Debug.js";

export default function setMode(this: Debug, state: boolean) {
    this.state = state ? "running" : "sleep";

    this.setActive(state);
    this.setVisible(state);
}