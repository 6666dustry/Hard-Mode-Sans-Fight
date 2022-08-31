import type Effect from "./Effect.js";
export default function removeAll(this: Effect) {
    if (this.fallingEnd) {
        this.fallingEnd.remove(true);
    }
}