export default function update() {
    if (!this.scene) {
        return;
    }
    if (this.Bones.length <= 0) {
        this.destroy();
        return;
    }
    this.startAngle += this.rotateSpeed;
    let BonePos = new Phaser.Math.Vector2(0, (this.boneRadius / 2 + this.spaceRadius));
    BonePos.rotate(Phaser.Math.DegToRad(this.startAngle));
    for (const iterator of this.Bones) {
        if (!iterator.destroyed) {
            iterator.setPosition(BonePos.x + this.x, BonePos.y + this.y);
            iterator.setAngle(iterator.angle + this.rotateSpeed);
            if (!this.lockLength) {
                iterator.displayLength = this.boneRadius;
            }
        }
        BonePos.rotate(Phaser.Math.DegToRad(this.getPadding()));
    }
    if (this.scene.director.Debug.state === "running" && this.middlePoint) {
        this.middlePoint.clear();
        this.middlePoint.x = this.x;
        this.middlePoint.y = this.y;
        this.middlePoint.fillCircle(0, 0, 5);
    }
    if (this.oldX !== this.x) {
        for (const iterator of this.Bones) {
            iterator.x += this.x - this.oldX;
        }
    }
    if (this.oldY !== this.y) {
        for (const iterator of this.Bones) {
            iterator.y += this.y - this.oldY;
        }
    }
    this.oldX = this.x;
    this.oldY = this.y;
}
//# sourceMappingURL=update.js.map