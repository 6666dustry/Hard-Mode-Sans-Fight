import { Body } from "matter";
import Heart from "./Heart.js";

function isFalling(this: Heart): boolean {
    const BODY: MatterJS.BodyType = this.Image.body as MatterJS.BodyType;
    switch (this.gravityDirection) {
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
export default isFalling;