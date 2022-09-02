import type Blue from "./blue.js";
export default function onGravity(this: Blue, gravityPower?: number) {
    const GRAVITY_POWER: number = gravityPower || 0.1;
    switch (this.Heart.gravityDirection) {
        case "up":
            this.Heart.Force.y += -GRAVITY_POWER;
            break;

        case "down":
            this.Heart.Force.y += GRAVITY_POWER;
            break;

        case "left":
            this.Heart.Force.x += -GRAVITY_POWER;
            break;

        case "right":
            this.Heart.Force.x += GRAVITY_POWER;
            break;
    }
}