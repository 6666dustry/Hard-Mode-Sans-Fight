function isFalling() {
    const BODY = this.Image.body;
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
//# sourceMappingURL=isFalling.js.map