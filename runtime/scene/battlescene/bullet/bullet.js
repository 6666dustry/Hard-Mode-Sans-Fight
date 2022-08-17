import checkTakeDamage from "./checkTakeDamage.js";
import getColorKey from "./getColorKey.js";
import setColorKey from "./setColorKey.js";
import setColor from "./setColor.js";
/**
 * base class for attacks.
 */
class Bullet extends Phaser.GameObjects.Container {
    constructor(scene, director, color, x, y, children) {
        super(scene, x, y, children);
        this.setColor = setColor;
        this.color = 0;
        this.tints = [];
        this.colorKey = color || "white";
        this.director = director;
        this.checkTakeDamage = checkTakeDamage;
    }
    director;
    /**0 is white ,1 is blue,and 2 is orange */
    color;
    tints;
    setColor;
    get colorKey() {
        return getColorKey.call(this);
    }
    set colorKey(v) {
        setColorKey.call(this, v, this.tints);
    }
    checkTakeDamage;
    update(...args) {
        this.checkTakeDamage(this.body);
    }
}
;
export default Bullet;
//# sourceMappingURL=bullet.js.map