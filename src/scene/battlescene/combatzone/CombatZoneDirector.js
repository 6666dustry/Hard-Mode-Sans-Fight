import CombatZone from "./box/combatzone.js";
import setRectDefault from "./setRectDefault.js";
import router from "./router.js";
import getZone from "./getZone.js";
import getIn from "./getIn.js";
import removeAll from "./removeAll.js";
export default class CombatZoneDirector extends Phaser.GameObjects.Group {
    constructor(scene, collide, heartCol, director) {
        super(scene);
        this.collide = collide;
        this.heartCol = heartCol;
        this.director = director;
        this.draws = [];
        this.menuRect = {
            x: 30,
            y: 250,
            dx: 600,
            dy: 385,
            duration: 200,
            inst: false,
            zone: "main",
            ease: "Linear",
            relPointX: 0,
            relPointY: 0
        };
        this.thickness = 6;
        this.setRectDefault = setRectDefault;
        this.router = router;
        this.getZone = getZone;
        this.getIn = getIn;
        this.removeAll = removeAll;
        this.Zones = {
            main: new CombatZone(scene, collide, heartCol, director, this)
        };
    }
    thickness;
    Zones;
    /**combatzone collide category */
    collide;
    /**heart collide category */
    heartCol;
    director;
    draws;
    /**dialog box. used for initialize. */
    menuRect;
    setRectDefault;
    getZone;
    getIn;
    removeAll;
    router;
    get midDialogPoint() {
        const X = (this.menuRect.x + this.menuRect.dx) / 2;
        const Y = (this.menuRect.y + this.menuRect.dy) / 2;
        return new Phaser.Math.Vector2(X, Y);
    }
    update(updateDisplay) {
        for (const key in this.Zones) {
            if (Object.prototype.hasOwnProperty.call(this.Zones, key)) {
                const element = this.Zones[key];
                element.update(this.draws, updateDisplay);
            }
        }
    }
}
//# sourceMappingURL=CombatZoneDirector.js.map