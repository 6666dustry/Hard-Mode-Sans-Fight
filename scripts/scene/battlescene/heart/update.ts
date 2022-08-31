import type MoveKey from "../../../MoveKey.js";
import type Heart from "./Heart.js";
export default function update(this: Heart, cursors: MoveKey, time: number): void {
    this.setDirection();
    switch (this.color) {
        case "red":
        case "falling":
            //red soul.
            this.redMovement(cursors);
            break;
        case "blue":
            //blue soul.
            this.blueMovement(cursors, time);
            break;
    }
    if (this.slamming) {
        this.scene.matter.step(1);
    }

    /* let box: Phaser.Geom.Rectangle = this.director.CombatzoneDirector.RectSize;
     const PADDING = this.Image.displayWidth / 2;
     let overed = false;
     if (this.Image.x < box.x + PADDING - 1) {
         this.Image.x = box.x + PADDING;
         overed = true;
     }
     if (this.Image.x > box.right - PADDING + 1) {
         this.Image.x = box.right - PADDING;
         overed = true;
     }
     if (this.Image.y < box.y + PADDING - 1) {
         this.Image.y = box.y + PADDING;
         overed = true;
     }
     if (this.Image.y > box.bottom - PADDING + 1) {
         this.Image.y = box.bottom - PADDING;
         overed = true;
     }*/
    this.updateVelocity();
    this.maxSpeed();
}