import type CombatZoneDirector from "./CombatZoneDirector.js";

export default function (this: CombatZoneDirector) {
    for (const key in this.Zones) {
        if (Object.prototype.hasOwnProperty.call(this.Zones, key)) {
            const element = this.Zones[key];
            if (key === "main") {
                continue;
            }
            element.clear(false, true);
        }
    }
}