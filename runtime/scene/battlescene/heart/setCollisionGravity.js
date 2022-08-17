import Keys from "../../../keys.js";
function setCollisionGravity() {
    if (this.colliding !== Keys.Label.platform) {
        if (this.collidingAt.top || this.collidingAt.bottom) {
            this.Force.y = 0;
        }
        if (this.collidingAt.left || this.collidingAt.right) {
            this.Force.x = 0;
        }
    }
}
export default setCollisionGravity;
//# sourceMappingURL=setCollisionGravity.js.map