function update(time, delta) {
    this.Face.anims.update(time, delta);
    let facePos = new Phaser.Geom.Point(this.x + this.Face.x + this.Face.displayWidth, this.y + this.Face.y);
    facePos = Phaser.Math.RotateAround(facePos, this.x, this.y, Phaser.Math.DegToRad(this.angle));
    const X = facePos.x, Y = facePos.y, SIZE = this.scene.scale;
    if (this.state === "moving" || this.state === "readyBlast") {
    }
    else {
        const ANG = Phaser.Math.Angle.WrapDegrees(this.angle);
        const PADDING = Math.max(this.Face.displayWidth, this.Face.displayHeight);
        if (ANG >= 0) {
            if (ANG >= 90 && (0 > Y + PADDING ||
                SIZE.width < X - PADDING)) {
                this.stopped || this.stopMove();
            }
            else if (0 > X + PADDING ||
                0 > Y + PADDING) {
                this.stopped || this.stopMove();
            }
        }
        else {
            if (ANG >= -90 && (0 > X + PADDING ||
                SIZE.height < Y - PADDING)) {
                this.stopped || this.stopMove();
            }
            else if (SIZE.width < X - PADDING ||
                SIZE.height < Y - PADDING) {
                this.stopped || this.stopMove();
            }
        }
        if (this.state === "endBlast" && this.stopped) {
            this.removeAll(true);
            this.destroy();
        }
    }
}
export default update;
//# sourceMappingURL=blasterUpdate.js.map