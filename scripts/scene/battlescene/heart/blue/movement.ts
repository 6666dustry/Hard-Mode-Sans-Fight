import Blue from "./blue.js";
import type { HeartDirection } from "../../../../Types.js";
import type MoveKey from "../../../../MoveKey.js";
/**
  * 
  * @param cursors keys data.
  * @param time just clock.
  */
export default function movement(this: Blue, cursors: MoveKey, time: number): void {
    this.setCollisionGravity();
    let direction: [
        boolean,//up
        boolean,//down
        boolean,//left
        boolean//right
    ] = [!0, !0, !0, !0];
    switch (this.Heart.gravityDirection) {
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
    this.Heart.Image.setTint(0x0000ff);
    const SPEED: number = this.scene.xKey.isDown ? this.Heart.slowSpeed : this.Heart.normalSpeed;

    direction[0] && cursors.upIsDown && (this.Heart.Force.y = -SPEED);
    direction[1] && cursors.downIsDown && (this.Heart.Force.y = SPEED);
    direction[2] && cursors.leftIsDown && (this.Heart.Force.x = -SPEED);
    direction[3] && cursors.rightIsDown && (this.Heart.Force.x = SPEED);

    ///set jump key.
    let jumpKey: HeartDirection;
    switch (this.Heart.gravityDirection) {
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


    if (this.canJump && !cursors[`${ jumpKey }IsDown`]) {
        //reload jump.
        this.jumped = false;
        this.jumpTime = time + 300;
    }
    //jump.

    if (this.jumpTime > time && cursors[`${ jumpKey }IsDown`] && !this.jumped) {
        this.onJump();
        this.jumping = true;
    } else {
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
        switch (this.Heart.gravityDirection) {
            case "up":
            case "down":
                this.Heart.Force.y *= VALUE;
                break;
            case "left":
            case "right":
                this.Heart.Force.x *= VALUE;
                break;
        }
        this.jumped = true;
    }

    //stop.

    //up
    if (direction[0] && !cursors.upIsDown) {
        if (this.Heart.Force.y < 0) {
            this.Heart.Force.y = 0;
        }
    }
    //down
    if (direction[1] && !cursors.downIsDown) {
        if (this.Heart.Force.y > 0) {
            this.Heart.Force.y = 0;
        }
    }
    //left
    if (direction[2] && !cursors.leftIsDown) {
        if (this.Heart.Force.x < 0) {
            this.Heart.Force.x = 0;
        }
    }
    //right
    if (direction[3] && !cursors.rightIsDown) {
        if (this.Heart.Force.x > 0) {
            this.Heart.Force.x = 0;
        }
    }
    //both 

    if (direction[2] && cursors.leftIsDown && direction[3] && cursors.rightIsDown) {
        this.Heart.Force.x = 0;
    }

    if (direction[0] && cursors.upIsDown && direction[1] && cursors.downIsDown) {
        this.Heart.Force.y = 0;
    }
}