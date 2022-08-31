import Debug from "./Debug.js";

export default function setMode(this: Debug, run: boolean) {
    this.state = run ? "running" : "sleep";
    this.running = run;
    this.showParameter.setVisible(run);
    this.showParameter.setActive(run);
    this.setActive(run);
    this.setVisible(run);
}