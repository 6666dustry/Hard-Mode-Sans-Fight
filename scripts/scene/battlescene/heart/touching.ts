import Keys from "../../../keys.js";
import type Heart from "./Heart.js";
export default function touching(this: Heart, args: { collision: Phaser.Types.Physics.Matter.MatterCollisionData; }): void {
    this.colliding = args.collision.bodyA.label as typeof this.colliding;
    let collided = args.collision.bodyA;
    if (this.colliding === Keys.Label.heart) {
        this.colliding = args.collision.bodyB.label as typeof this.colliding;
        collided = args.collision.bodyB;
    }

    this.slamming = false;


    let left = 0, right = 0, top = 0, bottom = 0;

    let points = [...args.collision.supports];

    for (let index = 0; index < points.length; index++) {
        const element = points[index];
        for (let j = 0; j < points.length; j++) {
            if (index === j) {
                continue;
            }
            if (Phaser.Math.Distance.BetweenPoints(element, points[j]) < 1) {
                points.splice(index, 1);
            }

        }
    }

    if (points.length === 1) {
        if (points[0].y > this.Image.y + this.Image.displayHeight / 3) {
            this.collidingAt.bottom = true;
        }

        if (points[0].y < this.Image.y - this.Image.displayHeight / 3) {
            this.collidingAt.top = true;
        }

        if (points[0].x < this.Image.x - this.Image.displayWidth / 3) {
            this.collidingAt.left = true;
        }

        if (points[0].x > this.Image.x + this.Image.displayWidth / 3) {
            this.collidingAt.right = true;
        }

    } else {
        for (const iterator of points) {

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