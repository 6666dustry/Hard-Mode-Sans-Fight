import Jumps from "./Jumps.js";

function init(this: Jumps) {
    for (const key in this.counter) {
        if (Object.prototype.hasOwnProperty.call(this.counter, key)) {
            this.counter[key] = undefined;
        }
    }
}
export default init;
