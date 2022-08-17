import Keys from "../../../keys.js";
function setLength() {
    if (this.oldLength !== this.displayLength) {
        const PADDING = this.top.displayHeight + this.bottom.displayHeight;
        if (Math.abs(this.displayLength) <= Math.abs(PADDING)) {
            this.boneLength = 1;
        }
        else {
            this.boneLength = this.displayLength - PADDING;
        }
        const ANG = this.angle;
        this.setAngle(0);
        this.middle.displayHeight = this.boneLength;
        this.top.setPosition(0, -(this.middle.displayHeight / 2) - this.top.displayHeight / 2);
        this.bottom.setPosition(0, (this.middle.displayHeight / 2) + this.bottom.displayHeight / 2);
        const BODY = this.body;
        const BODY_TOP = this.scene.matter.bodyBounds.getTopCenter(BODY);
        const BODY_BOTTOM = this.scene.matter.bodyBounds.getBottomCenter(BODY);
        if (BODY_TOP && BODY_BOTTOM) {
            const BODY_HEIGHT = BODY_TOP.y - BODY_BOTTOM.y;
            this.scene.matter.body.scale(BODY, 1, this.boneLength / BODY_HEIGHT);
        }
        if (this.tweenAnchor !== "middle") {
            const CHANGED = this.displayLength - this.oldLength;
            let move = new Phaser.Math.Vector2(0, CHANGED / 2);
            if (this.tweenAnchor === "top") {
                move.rotate(Phaser.Math.DegToRad(ANG + 180));
                this.x += move.x;
                this.y += move.y;
            }
            else {
                move.rotate(Phaser.Math.DegToRad(ANG));
                this.x += move.x;
                this.y += move.y;
            }
        }
        this.setAngle(ANG);
    }
}
function setAngle() {
    if (this.angle !== this.oldAngle) {
        if (this.tweenAnchor !== "middle") {
            let move = new Phaser.Math.Vector2(this.x, this.y);
            let origin = new Phaser.Math.Vector2(this.x, this.y + this.displayLength / 2);
            if (this.tweenAnchor === "top") {
                Phaser.Math.RotateAround(origin, this.x, this.y, Phaser.Math.DegToRad(this.oldAngle + 180));
                Phaser.Math.RotateAround(move, origin.x, origin.y, Phaser.Math.DegToRad(this.angle - this.oldAngle));
                this.setPosition(move.x, move.y);
            }
            else {
                Phaser.Math.RotateAround(origin, this.x, this.y, Phaser.Math.DegToRad(this.oldAngle));
                Phaser.Math.RotateAround(move, origin.x, origin.y, Phaser.Math.DegToRad(this.angle - this.oldAngle));
                this.setPosition(move.x, move.y);
            }
        }
    }
}
/**
 * used for custom tween.
 * @param this
 */
function update() {
    if (!this.body) {
        this.scene.tweens.killTweensOf(this);
        return;
    }
    if (this.speed) {
        if (this.speedAngle) {
            let To = new Phaser.Math.Vector2(this.speed, 0);
            To.rotate(Phaser.Math.DegToRad(this.speedAngle));
            this.x += To.x;
            this.y += To.y;
        }
        else {
            this.x += this.speed;
        }
    }
    this.setAngle(this.angle + this.spin);
    setLength.call(this);
    setAngle.call(this);
    if (this.oldColor !== this.color) {
        this.setColor(Keys.Color[this.colorKey]);
    }
    this.oldColor = this.color;
    this.oldLength = this.displayLength;
    this.oldAngle = this.angle;
}
export default update;
;
//# sourceMappingURL=BoneUpdate.js.map