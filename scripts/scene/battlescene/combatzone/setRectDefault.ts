import type CombatZoneDirector from "./CombatZoneDirector.js";
export default function setRectDefault(this: CombatZoneDirector, inst?: boolean) {
    this.removeAll();
    this.Zones.main.setRect(this.menuRect, inst);
}