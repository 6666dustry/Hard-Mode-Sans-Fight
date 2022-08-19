import Heart from "./Heart.js";
export default function isMoving(this: Heart): boolean {


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
            const element = Keys[key as keyof typeof Keys];
            if (element && this.director.cursors[`${ key as keyof typeof Keys }IsDown`]) {
                Down[key as keyof typeof Keys] = true;
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
            const element = Down[key as keyof typeof Down];
            if (element) {
                return true;
            }
        }
    }

    return false;
}