import Keys from "../../../keys.js";
export default function setCollisionGravity() {
    if (this.colliding !== Keys.Label.platform) {
        if (this.collidingAt.top || this.collidingAt.bottom) {
            this.Force.y = 0;
        }
        if (this.collidingAt.left || this.collidingAt.right) {
            this.Force.x = 0;
        }
    }
}
//# sourceMappingURL=setCollisionGravity.js.map