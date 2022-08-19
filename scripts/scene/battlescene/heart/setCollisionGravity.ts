import Keys from "../../../keys.js";
import Heart from "./Heart.js";

export default function setCollisionGravity(this: Heart) {
    if (this.colliding !== Keys.Label.platform) {


        if (this.collidingAt.top || this.collidingAt.bottom) {
            this.Force.y = 0;
        }

        if (this.collidingAt.left || this.collidingAt.right) {
            this.Force.x = 0;
        }
    }
}