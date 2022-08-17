/**
 * @return in degrees.
 */
function setDirection() {
    const ANG = this.Image.setAngle.bind(this.Image);
    if (this.color === "red") {
        ANG(0);
        this.gravityDirection = "down";
        return 0;
    }
    else {
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
export default setDirection;
//# sourceMappingURL=setDirection.js.map