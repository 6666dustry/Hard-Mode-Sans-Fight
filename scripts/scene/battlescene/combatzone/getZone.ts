import type CombatZoneDirector from "./CombatZoneDirector.js";
export default function getZone(this: CombatZoneDirector, name?: string) {
    return this.Zones[name || "main"];
}