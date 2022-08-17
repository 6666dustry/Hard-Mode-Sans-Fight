import CombatZone from "./box/combatzone.js";
import CombatZoneDirector from "./CombatZoneDirector.js";

export default function getIn(this: CombatZoneDirector, x: number | Phaser.Geom.Point, y?: number): CombatZone | false {
    let point: Phaser.Geom.Point;
    if (typeof x === "number") {
        if (y == null) {
            y = x;
        }
        point = new Phaser.Geom.Point(x, y);
    } else {
        point = x;
    }
    for (const key in this.Zones) {
        if (Object.prototype.hasOwnProperty.call(this.Zones, key)) {
            const element = this.Zones[key];
            if (Phaser.Geom.Rectangle.ContainsPoint(element.RectSize, point)) {
                return element;
            }
        }
    }
    return false;
}