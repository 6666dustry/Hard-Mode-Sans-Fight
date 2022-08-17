function setRect(config, overlapInst) {
    let x, y, dx, dy, duration, inst, relPointX, relPointY;
    relPointX = config.relPointX || 0;
    relPointY = config.relPointY || 0;
    x = typeof config.x === "number" ? config.x + relPointX : this.RectSize.x;
    y = typeof config.y === "number" ? config.y + relPointY : this.RectSize.y;
    dx = typeof config.dx === "number" ? config.dx + relPointX : this.RectSize.right;
    dy = typeof config.dy === "number" ? config.dy + relPointY : this.RectSize.bottom;
    if (x > dx) {
        const CHANGER = dx;
        dx = x;
        x = CHANGER;
    }
    if (y > dy) {
        const CHANGER = dy;
        dy = y;
        y = CHANGER;
    }
    duration = config.duration || 500;
    inst = config.inst || false;
    this.scene.tweens.killTweensOf(this.RectSize);
    if (!inst && !overlapInst) {
        this.scene.tweens.add({
            targets: this,
            props: {
                boxX: x,
                boxY: y,
                boxDx: dx,
                boxDy: dy,
            },
            duration: duration,
            ease: config.ease
        });
    }
    else {
        this.boxX = x;
        this.boxY = y;
        this.boxDx = dx;
        this.boxDy = dy;
    }
    this.moving = true;
}
export default setRect;
//# sourceMappingURL=setRect.js.map