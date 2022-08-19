import Heart from "./Heart.js";
/**
 * @return in degrees.
 */
export default function setDirection(this: Heart): number {
    const ANG: typeof this.Image.setAngle = this.Image.setAngle.bind(this.Image);
    if (this.color === "red") {
        ANG(0);
        this.gravityDirection = "down";
        return 0;
    } else {
        switch (this.gravityDirection) {
            case "up":
                ANG(180);
                return 180;
            case "down":
                ANG(0);
                return 0;
            case "left":
                ANG(90);
                return 90;
            case "right":
                ANG(270);
                return 270;
        }
    }
}