import Bullet from "./bullet.js";

/**
 * 
 */
export default function checkTakeDamage(this: Bullet, body: MatterJS.BodyType, takeKr?: boolean, remain1?: boolean) {
    if (!remain1 || this.director.Statuses.hp > 1) {
        switch (Math.floor(this.color) % 3) {
            case 0:
                this.scene.matter.overlap(
                    this.director.Heart.Image.body as MatterJS.BodyType,
                    [body],
                    this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                break;
            case 1:
                if (this.director.Heart.moving) {
                    this.scene.matter.overlap(
                        this.director.Heart.Image.body as MatterJS.BodyType,
                        [body],
                        this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                }
                break;
            case 2:
                if (!this.director.Heart.moving) {
                    this.scene.matter.overlap(
                        this.director.Heart.Image.body as MatterJS.BodyType,
                        [body],
                        this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                }
                break;
        }
    }
}