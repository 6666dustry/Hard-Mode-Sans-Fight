/**
   * red soul custom movement.
   * @param cursors keys data.
   */
export default function redMovement(cursors) {
    //set color to red.
    if (this.color === "red") {
        this.Image.setTint(0xff0000);
    }
    else {
        this.Image.setTint(0x0000ff);
    }
    const SPEED = this.scene.xKey.isDown ? this.slowSpeed : this.normalSpeed;
    cursors.leftIsDown && (this.Force.x = -SPEED);
    cursors.rightIsDown && (this.Force.x = SPEED);
    cursors.upIsDown && (this.Force.y = -SPEED);
    cursors.downIsDown && (this.Force.y = SPEED);
    if (!(cursors.leftIsDown || cursors.rightIsDown) || (cursors.leftIsDown && cursors.rightIsDown)) {
        this.Force.x = 0;
    }
    if (!(cursors.upIsDown || cursors.downIsDown) || (cursors.upIsDown && cursors.downIsDown)) {
        this.Force.y = 0;
    }
}
//# sourceMappingURL=redMovement.js.map