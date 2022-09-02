import Keys from "../../../../keys.js";
import type Blue from "./blue.js";
export default function setCollisionGravity(this: Blue) {
    if (this.Heart.colliding !== Keys.Label.platform) {


        if (this.Heart.collidingAt.top || this.Heart.collidingAt.bottom) {
            this.Heart.Force.y = 0;
        }

        if (this.Heart.collidingAt.left || this.Heart.collidingAt.right) {
            this.Heart.Force.x = 0;
        }
    }
}