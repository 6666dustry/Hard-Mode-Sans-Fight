import Blue from "./blue.js";
export default function isFalling(this: Blue): boolean {
    const BODY: MatterJS.BodyType = this.Heart.Image.body as MatterJS.BodyType;
    switch (this.Heart.gravityDirection) {
        case "up":
            return BODY.velocity.y <= 0;
        case "down":
            return BODY.velocity.y >= 0;
        case "right":
            return BODY.velocity.x >= 0;
        case "left":
            return BODY.velocity.x <= 0;
    }
}