import Heart from "./Heart.js";

export default function onGravity(this: Heart, gravityPower?: number) {
    const GRAVITY_POWER: number = gravityPower || 0.1;
    switch (this.gravityDirection) {
        case "up":
            this.Force.y += -GRAVITY_POWER;
            break;

        case "down":
            this.Force.y += GRAVITY_POWER;
            break;

        case "left":
            this.Force.x += -GRAVITY_POWER;
            break;

        case "right":
            this.Force.x += GRAVITY_POWER;
            break;
    }
}