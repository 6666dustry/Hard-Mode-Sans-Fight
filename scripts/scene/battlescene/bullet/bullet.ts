import { bulletColor } from "../../../Types.js";
import Director from "../director/Director.js";
import checkTakeDamage from "./checkTakeDamage.js";
import getColorKey from "./getColorKey.js";
import setColorKey from "./setColorKey.js";
import setColor from "./setColor.js";
/**
 * base class for attacks.
 */
class Bullet extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, director: Director, color?: bulletColor, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        this.setColor = setColor;

        this.color = 0;
        this.tints = [];
        this.colorKey = color || "white";
        this.director = director;

        this.checkTakeDamage = checkTakeDamage;
    }
    declare body: MatterJS.BodyType;
    director: Director;
    /**0 is white ,1 is blue,and 2 is orange */
    color: number;
    tints: {
        setTint: (arg: number) => any;
    }[];
    setColor: typeof setColor;
    public get colorKey(): "white" | "blue" | "orange" {
        return getColorKey.call(this);
    }
    public set colorKey(v: bulletColor) {
        setColorKey.call(this, v, this.tints);
    }
    checkTakeDamage: typeof checkTakeDamage;
    update(...args: any) {
        this.checkTakeDamage(this.body);
    }
};
export default Bullet;