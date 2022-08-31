import type { combatZoneConfig as CombatZoneConfig, combatzoneType } from "../../../Types.js";
import type CombatZoneDirector from "./CombatZoneDirector.js";
export default function router(this: CombatZoneDirector, config: CombatZoneConfig, type: combatzoneType) {
    return this.Zones[config.zone || "main"].router(config, type);
}