import Keys from "../../../keys.js";
function maxSpeed() {
    let max = 3;
    if (this.colliding == Keys.Label.platform) {
        max = 1.5;
    }
    if (!this.slamming) {
        this.Force.x > max ? this.Force.x = max :
            this.Force.x < -max ? this.Force.x = -max :
                undefined;
        this.Force.y > max ? this.Force.y = max :
            this.Force.y < -max ? this.Force.y = -max :
                undefined;
    }
}
export default maxSpeed;
//# sourceMappingURL=maxSpeed.js.map