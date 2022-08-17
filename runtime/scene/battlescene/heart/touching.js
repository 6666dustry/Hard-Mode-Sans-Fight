import Keys from "../../../keys.js";
function touching(args) {
    this.colliding = args.collision.bodyA.label;
    let collided = args.collision.bodyA;
    if (this.colliding === Keys.Label.heart) {
        this.colliding = args.collision.bodyB.label;
        collided = args.collision.bodyB;
    }
    this.slamming = false;
    let left = 0, right = 0, top = 0, bottom = 0;
    for (const iterator of args.collision.supports) {
        if (args.collision.supports.length === 1) {
            if (iterator.y > this.Image.y) {
                this.collidingAt.bottom = true;
            }
            if (iterator.y < this.Image.y) {
                this.collidingAt.top = true;
            }
            if (iterator.x < this.Image.x) {
                this.collidingAt.left = true;
            }
            if (iterator.x > this.Image.x) {
                this.collidingAt.right = true;
            }
        }
        else {
            if (iterator.y > this.Image.y) {
                bottom++;
            }
            if (bottom >= 2) {
                this.collidingAt.bottom = true;
            }
            if (iterator.y < this.Image.y) {
                top++;
            }
            if (top >= 2) {
                this.collidingAt.top = true;
            }
            if (iterator.x < this.Image.x) {
                left++;
            }
            if (left >= 2) {
                this.collidingAt.left = true;
            }
            if (iterator.x > this.Image.x) {
                right++;
            }
            if (right >= 2) {
                this.collidingAt.right = true;
            }
        }
    }
    switch (this.gravityDirection) {
        case "down":
            this.canJump = this.collidingAt.bottom;
            break;
        case "up":
            this.canJump = this.collidingAt.top;
            break;
        case "left":
            this.canJump = this.collidingAt.left;
            break;
        case "right":
            this.canJump = this.collidingAt.right;
            break;
    }
}
export default touching;
//# sourceMappingURL=touching.js.map