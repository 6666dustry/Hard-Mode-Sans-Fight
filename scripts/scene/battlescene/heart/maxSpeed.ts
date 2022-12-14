import type Heart from "./Heart.js";
import Keys from "../../../keys.js";
export default function maxSpeed(this: Heart) {
    let max = 3;
    if (this.colliding == Keys.Label.platform) {
        max = 1.5;
    }

    if (!this.slamming) {
        this.Force.x > max ? this.Force.x = max :
            this.Force.x < -max ? this.Force.x = -max :
                undefined;
        this.Force.y > max ? this.Force.y = max :
            this.Force.y < -max ? this.Force.y = -max :
                undefined;
    }
}