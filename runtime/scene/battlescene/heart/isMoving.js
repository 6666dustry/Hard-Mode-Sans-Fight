export default function isMoving() {
    let Keys = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    if (this.color === "blue") {
        Keys[this.gravityDirection] = false;
    }
    let Down = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    for (const key in Keys) {
        if (Object.prototype.hasOwnProperty.call(Keys, key)) {
            const element = Keys[key];
            if (element && this.director.cursors[`${key}IsDown`]) {
                Down[key] = true;
            }
        }
    }
    if (Keys.down && Keys.up && Down.down && Down.up) {
        Down.down = false;
        Down.up = false;
    }
    if (Keys.left && Keys.right && Down.left && Down.right) {
        Down.left = false;
        Down.right = false;
    }
    for (const key in Down) {
        if (Object.prototype.hasOwnProperty.call(Down, key)) {
            const element = Down[key];
            if (element) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=isMoving.js.map