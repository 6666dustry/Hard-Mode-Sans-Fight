import type Jumps from "./Jumps.js";
export default function init(this: Jumps) {
    for (const key in this.counter) {
        if (Object.prototype.hasOwnProperty.call(this.counter, key)) {
            this.counter[key] = undefined;
        }
    }
}
