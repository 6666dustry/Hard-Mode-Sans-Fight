/**
 * only used for stab bone.
 * @param a compare value.
 * @param b compare value.
 * @param angle degrees
 */
function compareBigger(a, b, angle) {
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
    }
    else if (angle < 180) {
        return (a.x <= b.x && a.y <= b.y);
    }
    else if (angle < 270) {
        return (a.x >= b.x && a.y <= b.y);
    }
    else {
        return (a.x >= b.x && a.y >= b.y);
    }
}
export default compareBigger;
//# sourceMappingURL=compareBigger.js.map