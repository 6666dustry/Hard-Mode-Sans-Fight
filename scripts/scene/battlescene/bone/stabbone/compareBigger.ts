/**
 * only used for stab bone.
 * @param a compare value.
 * @param b compare value.
 * @param angle degrees
 */
export default function compareBigger(a: Phaser.Math.Vector2, b: Phaser.Math.Vector2, angle: number): boolean {
    angle %= 360;
    if (angle < 0) {
        angle += 360;
    }
    switch (angle) {
        case 0:
            return a.x <= b.x;
        case 90:
            return a.y >= b.y;
        case 180:
            return a.x >= b.x;
        case 270:
            return a.y <= b.y;
    }
    if (angle < 90) {
        return (a.x <= b.x && a.y >= b.y);
    } else if (angle < 180) {
        return (a.x <= b.x && a.y <= b.y);
    } else if (angle < 270) {
        return (a.x >= b.x && a.y <= b.y);
    } else {
        return (a.x >= b.x && a.y >= b.y);
    }
}