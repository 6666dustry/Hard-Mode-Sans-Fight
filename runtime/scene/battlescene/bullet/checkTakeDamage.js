/**
 *
 */
export default function checkTakeDamage(body, takeKr, remain1) {
    if (!remain1 || this.director.Statuses.hp > 1) {
        switch (Math.floor(this.color) % 3) {
            case 0:
                this.scene.matter.overlap(this.director.Heart.Image.body, [body], this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                break;
            case 1:
                if (this.director.Heart.moving) {
                    this.scene.matter.overlap(this.director.Heart.Image.body, [body], this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                }
                break;
            case 2:
                if (!this.director.Heart.moving) {
                    this.scene.matter.overlap(this.director.Heart.Image.body, [body], this.director.Statuses.takeDamage.bind(this.director.Statuses, takeKr));
                }
                break;
        }
    }
}
//# sourceMappingURL=checkTakeDamage.js.map