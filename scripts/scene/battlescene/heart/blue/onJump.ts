import type Blue from "./blue.js";
export default function onJump(this: Blue) {
    const JUMP_POWER: number = 3;
    switch (this.Heart.gravityDirection) {
        case "up":
            this.Heart.Force.y = JUMP_POWER;
            break;

        case "down":
            this.Heart.Force.y = -JUMP_POWER;
            break;

        case "left":
            this.Heart.Force.x = JUMP_POWER;
            break;

        case "right":
            this.Heart.Force.x = -JUMP_POWER;
            break;
    }
}