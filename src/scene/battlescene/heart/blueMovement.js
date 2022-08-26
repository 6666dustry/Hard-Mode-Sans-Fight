/**
  *
  * @param cursors keys data.
  * @param time just clock.
  */
export default function blueMovement(cursors, time) {
    this.setCollisionGravity();
    let direction = [!0, !0, !0, !0];
    switch (this.gravityDirection) {
        case "up":
        case "down":
            direction[0] = false;
            direction[1] = false;
            break;
        case "left":
        case "right":
            direction[2] = false;
            direction[3] = false;
            break;
    }
    //set color to blue.
    this.Image.setTint(0x0000ff);
    const SPEED = this.scene.xKey.isDown ? this.slowSpeed : this.normalSpeed;
    direction[0] && cursors.upIsDown && (this.Force.y = -SPEED);
    direction[1] && cursors.downIsDown && (this.Force.y = SPEED);
    direction[2] && cursors.leftIsDown && (this.Force.x = -SPEED);
    direction[3] && cursors.rightIsDown && (this.Force.x = SPEED);
    ///set jump key.
    let jumpKey;
    switch (this.gravityDirection) {
        case "up":
            jumpKey = "down";
            break;
        case "down":
            jumpKey = "up";
            break;
        case "left":
            jumpKey = "right";
            break;
        case "right":
            jumpKey = "left";
            break;
    }
    if (this.canJump && !cursors[`${jumpKey}IsDown`]) {
        //reload jump.
        this.jumped = false;
        this.jumpTime = time + 300;
    }
    //jump.
    if (this.jumpTime > time && cursors[`${jumpKey}IsDown`] && !this.jumped) {
        this.onJump();
        this.jumping = true;
    }
    else {
        if (!this.canJump) {
            this.onGravity();
            this.jumping = false;
        }
    }
    if (cursors.detectKeys(jumpKey, {
        type: "up",
        just: true
    }) && !this.isFalling) {
        const VALUE = 0.2;
        switch (this.gravityDirection) {
            case "up":
            case "down":
                this.Force.y *= VALUE;
                break;
            case "left":
            case "right":
                this.Force.x *= VALUE;
                break;
        }
        this.jumped = true;
    }
    //stop.
    //up
    if (direction[0] && !cursors.upIsDown) {
        if (this.Force.y < 0) {
            this.Force.y = 0;
        }
    }
    //down
    if (direction[1] && !cursors.downIsDown) {
        if (this.Force.y > 0) {
            this.Force.y = 0;
        }
    }
    //left
    if (direction[2] && !cursors.leftIsDown) {
        if (this.Force.x < 0) {
            this.Force.x = 0;
        }
    }
    //right
    if (direction[3] && !cursors.rightIsDown) {
        if (this.Force.x > 0) {
            this.Force.x = 0;
        }
    }
    //both 
    if (direction[2] && cursors.leftIsDown && direction[3] && cursors.rightIsDown) {
        this.Force.x = 0;
    }
    if (direction[0] && cursors.upIsDown && direction[1] && cursors.downIsDown) {
        this.Force.y = 0;
    }
}
//# sourceMappingURL=blueMovement.js.map