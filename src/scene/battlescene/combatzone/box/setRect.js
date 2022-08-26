import checkType from "../../checkType.js";
export default function setRect(config, overlapInst) {
    const DATA = checkType(config, {
        x: {
            type: "number",
            default: this.RectSize.x - (typeof config.relPointX === "number" ? config.relPointX : 0)
        },
        y: {
            type: "number",
            default: this.RectSize.y - (typeof config.relPointY === "number" ? config.relPointY : 0)
        },
        dx: {
            type: "number",
            default: this.RectSize.right - (typeof config.relPointX === "number" ? config.relPointX : 0)
        },
        dy: {
            type: "number",
            default: this.RectSize.bottom - (typeof config.relPointY === "number" ? config.relPointY : 0)
        },
        duration: {
            type: "number",
            default: 500
        },
        inst: {
            type: "boolean",
            default: false
        },
        relPointX: {
            type: "number",
            default: 0
        },
        relPointY: {
            type: "number",
            default: 0
        },
        ease: {
            type: "string",
            default: "Linear"
        },
        zone: {
            type: "string",
            default: "main"
        }
    }, this.director.AttackLoader.runAttackPos);
    let x, y, dx, dy, duration, inst, relPointX, relPointY;
    relPointX = DATA.relPointX;
    relPointY = DATA.relPointY;
    x = DATA.x + relPointX;
    y = DATA.y + relPointY;
    dx = DATA.dx + relPointX;
    dy = DATA.dy + relPointY;
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
    duration = DATA.duration;
    inst = DATA.inst;
    this.scene.tweens.killTweensOf(this.RectSize);
    if (!inst && !overlapInst) {
        this.scene.tweens.add({
            targets: this.RectSize,
            props: {
                x: x,
                y: y,
                right: dx,
                bottom: dy,
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
//# sourceMappingURL=setRect.js.map