export default function onJump() {
    const JUMP_POWER = 3;
    switch (this.gravityDirection) {
        case "up":
            this.Force.y = JUMP_POWER;
            break;
        case "down":
            this.Force.y = -JUMP_POWER;
            break;
        case "left":
            this.Force.x = JUMP_POWER;
            break;
        case "right":
            this.Force.x = -JUMP_POWER;
            break;
    }
}
//# sourceMappingURL=onJump.js.map